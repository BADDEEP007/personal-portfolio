# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "portfolio-analytics")
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your preferred location
5. Click "Done"

## Step 3: Create Service Account

1. Go to Project Settings (gear icon)
2. Click on "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Keep this file secure - it contains sensitive credentials

## Step 4: Configure Environment Variables

From the downloaded JSON file, extract these values for your `.env` file:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id

# Admin Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
```

## Step 5: Install Dependencies

```bash
npm install firebase-admin jsonwebtoken
```

## Step 6: Security Rules (Optional)

For production, update Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow server-side access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Step 7: Test the Setup

1. Start your server: `npm run dev`
2. Submit a contact form
3. Check Firestore console for new documents
4. Visit `/admin` to access the dashboard

## 📊 Features Included

### Analytics Dashboard
- ✅ Total submissions count
- ✅ Daily submission charts
- ✅ Email domain analysis
- ✅ Subject line trends
- ✅ Time period filtering

### Contact Management
- ✅ View all submissions
- ✅ Update submission status (New/Read/Replied/Archived)
- ✅ Search and filter capabilities
- ✅ Export functionality (coming soon)

### Security Features
- ✅ JWT authentication
- ✅ Protected admin routes
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ Secure credential storage

## 🚀 Access Your Dashboard

1. **Login URL**: `http://localhost:3000/admin`
2. **Default Credentials**: 
   - Username: `admin`
   - Password: `admin123` (change this!)

## 🔒 Security Best Practices

1. **Change default admin password**
2. **Use strong JWT secret (32+ characters)**
3. **Enable Firestore security rules**
4. **Use HTTPS in production**
5. **Regularly rotate credentials**
6. **Monitor access logs**

## 📈 Database Structure

```
contact_submissions/
├── {documentId}/
    ├── name: string
    ├── email: string
    ├── subject: string
    ├── message: string
    ├── timestamp: timestamp
    ├── createdAt: string
    ├── status: string (new/read/replied/archived)
    ├── ipAddress: string
    ├── userAgent: string
    └── emailSent: boolean
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Firebase Auth Error**: Check private key formatting
2. **Permission Denied**: Verify service account permissions
3. **Network Error**: Check Firebase project ID
4. **JWT Error**: Verify JWT_SECRET is set

### Debug Commands:

```bash
# Test Firebase connection
curl http://localhost:5000/api/health

# Test admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📞 Support

If you encounter issues:
1. Check server logs for detailed error messages
2. Verify all environment variables are set
3. Ensure Firebase project is properly configured
4. Test with a simple contact form submission first