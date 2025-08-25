const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const {
  logContactSubmission,
  getAnalytics,
  updateSubmissionStatus,
} = require("../config/firebase");
const {
  generateToken,
  authenticateToken,
  validateAdminCredentials,
} = require("../middleware/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || [
      "http://localhost:3000",
      "https://portfolio-backend-400hqdwcq-baddeeps-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many contact form submissions, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Gmail SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",

    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input function
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
};

// Contact form endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required.",
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Validate email format
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    // Length validation
    if (
      sanitizedName.length > 100 ||
      sanitizedSubject.length > 200 ||
      sanitizedMessage.length > 2000
    ) {
      return res.status(400).json({
        success: false,
        error: "Input length exceeds maximum allowed characters.",
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Email content for you (recipient)
    const recipientMailOptions = {
      from: {
        name: "Portfolio Contact Form",
        address: sanitizedEmail,
      },
      to: "baddeep106@gmail.com",
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #9333ea, #7c3aed); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #9333ea; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Contact Information</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${sanitizedName}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${sanitizedEmail}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${sanitizedSubject}</p>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #7c3aed; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Message</h3>
              <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #e9ecef; border-radius: 4px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                This message was sent from your portfolio contact form on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        Subject: ${sanitizedSubject}
        
        Message:
        ${sanitizedMessage}
        
        Sent on: ${new Date().toLocaleString()}
      `,
    };

    // Auto-reply email for the sender
    const autoReplyOptions = {
      from: {
        name: "Your Portfolio",
        address: process.env.GMAIL_USER,
      },
      to: sanitizedEmail,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #9333ea, #7c3aed); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${sanitizedName},
            </p>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting me through my portfolio! I've received your message about "<strong>${sanitizedSubject}</strong>" and I appreciate you taking the time to reach out.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #9333ea; border-radius: 4px; margin: 20px 0;">
              <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0;">
                I typically respond to all inquiries within 24-48 hours. I'll review your message carefully and get back to you as soon as possible.
              </p>
            </div>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to explore my portfolio and check out my latest projects. You can also connect with me on social media for updates on my work.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #333; font-size: 16px; margin: 0;">
                Best regards,<br>
                <strong style="color: #9333ea;">Pradeep Argal</strong>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #e9ecef; border-radius: 4px;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Hi ${sanitizedName},
        
        Thank you for contacting me through my portfolio! I've received your message about "${sanitizedSubject}" and I appreciate you taking the time to reach out.
        
        I typically respond to all inquiries within 24-48 hours. I'll review your message carefully and get back to you as soon as possible.
        
        Best regards,
        Pradeep Argal
        
        ---
        This is an automated response. Please do not reply to this email.
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(recipientMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    // Log to Firebase
    try {
      const submissionData = {
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get("User-Agent"),
        emailSent: true,
      };

      await logContactSubmission(submissionData);
    } catch (firebaseError) {
      console.error("Firebase logging error:", firebaseError);
      // Don't fail the request if Firebase logging fails
    }

    console.log(
      `Contact form submission from ${sanitizedEmail} sent successfully`
    );

    res.status(200).json({
      success: true,
      message: "Message sent successfully! Thank you for reaching out.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle specific nodemailer errors
    if (error.code === "EAUTH") {
      return res.status(500).json({
        success: false,
        error: "Email authentication failed. Please try again later.",
      });
    }

    if (error.code === "ECONNECTION") {
      return res.status(500).json({
        success: false,
        error: "Unable to connect to email service. Please try again later.",
      });
    }

    res.status(500).json({
      success: false,
      error: `${error}Failed to send message. Please try again later.`,
    });
  }
});

// Admin login endpoint
app.post("/api/admin/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Username and password are required",
      });
    }

    if (!validateAdminCredentials(username, password)) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = generateToken({
      username,
      role: "admin",
      loginTime: new Date().toISOString(),
    });

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
});

// Get analytics data (protected route)
app.get("/api/admin/analytics", authenticateToken, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const analytics = await getAnalytics(days);

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch analytics",
    });
  }
});

// Update submission status (protected route)
app.patch("/api/admin/submissions/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "replied", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    await updateSubmissionStatus(id, status);

    res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update status",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Test email endpoint (for development only)
if (process.env.NODE_ENV === "development") {
  app.post("/api/test-email", async (req, res) => {
    try {
      const transporter = createTransporter();
      await transporter.verify();

      res.status(200).json({
        success: true,
        message: "Email configuration is working correctly",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Email configuration failed",
        details: error.message,
      });
    }
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// Export for Vercel serverless function
module.exports = app;
