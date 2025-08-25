const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
        token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID
      });

      console.log('🔥 Firebase Admin initialized successfully');
    }

    return admin.firestore();
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    throw error;
  }
};

// Get Firestore instance
const getFirestore = () => {
  return initializeFirebase();
};

// Log contact form submission to Firebase
const logContactSubmission = async (submissionData) => {
  try {
    const db = getFirestore();
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    const docData = {
      ...submissionData,
      timestamp,
      createdAt: new Date().toISOString(),
      status: 'new',
      ipAddress: submissionData.ipAddress || 'unknown',
      userAgent: submissionData.userAgent || 'unknown'
    };

    const docRef = await db.collection('contact_submissions').add(docData);
    
    console.log('📝 Contact submission logged to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error logging to Firebase:', error);
    throw error;
  }
};

// Get analytics data
const getAnalytics = async (days = 30) => {
  try {
    const db = getFirestore();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const snapshot = await db
      .collection('contact_submissions')
      .where('createdAt', '>=', startDate.toISOString())
      .orderBy('createdAt', 'desc')
      .get();

    const submissions = [];
    const dailyStats = {};
    const emailDomains = {};
    const subjects = {};

    snapshot.forEach(doc => {
      const data = { id: doc.id, ...doc.data() };
      submissions.push(data);

      // Daily stats
      const date = new Date(data.createdAt).toDateString();
      dailyStats[date] = (dailyStats[date] || 0) + 1;

      // Email domain stats
      if (data.email) {
        const domain = data.email.split('@')[1];
        emailDomains[domain] = (emailDomains[domain] || 0) + 1;
      }

      // Subject stats
      if (data.subject) {
        subjects[data.subject] = (subjects[data.subject] || 0) + 1;
      }
    });

    return {
      totalSubmissions: submissions.length,
      submissions,
      dailyStats,
      emailDomains,
      subjects,
      period: `${days} days`
    };
  } catch (error) {
    console.error('❌ Error getting analytics:', error);
    throw error;
  }
};

// Update submission status
const updateSubmissionStatus = async (submissionId, status) => {
  try {
    const db = getFirestore();
    await db.collection('contact_submissions').doc(submissionId).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`📝 Submission ${submissionId} status updated to: ${status}`);
    return true;
  } catch (error) {
    console.error('❌ Error updating submission status:', error);
    throw error;
  }
};

module.exports = {
  initializeFirebase,
  getFirestore,
  logContactSubmission,
  getAnalytics,
  updateSubmissionStatus
};