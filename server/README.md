# Portfolio Contact Form Server

A secure Express.js server with Nodemailer integration for handling portfolio contact form submissions via Gmail SMTP.

## 🚀 Features

- **Secure Contact Form**: Input validation, sanitization, and rate limiting
- **Gmail SMTP Integration**: Send emails using Gmail's SMTP service
- **Auto-Reply System**: Automatic confirmation emails to form submitters
- **Beautiful Email Templates**: Professional HTML email templates
- **Rate Limiting**: Prevents spam and abuse (5 submissions per 15 minutes per IP)
- **Input Validation**: Comprehensive validation and sanitization
- **Error Handling**: Robust error handling with detailed logging
- **CORS Support**: Configured for frontend integration
- **Development Tools**: Hot reload with nodemon

## 📋 Prerequisites

- Node.js (v16 or higher)
- Gmail account with App Password enabled
- npm or yarn package manager

## 🛠️ Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

## 🔐 Gmail Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security"
3. Enable "2-Step Verification"

### Step 2: Generate App Password
1. In Google Account settings, go to "Security"
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" and "Other (custom name)"
4. Enter "Portfolio Contact Form"
5. Copy the 16-character password
6. Use this password in your `.env` file as `GMAIL_APP_PASSWORD`

## 🚀 Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your specified PORT).

## 📡 API Endpoints

### POST `/api/contact`
Send a contact form submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! Thank you for reaching out."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Email is required", "Message is too short"]
}
```

### GET `/api/health`
Check server health status.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### POST `/api/test-email` (Development Only)
Test email configuration.

**Response:**
```json
{
  "success": true,
  "message": "Email configuration is working correctly"
}
```

## 🔒 Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation for all fields
- **Input Sanitization**: Removes HTML tags and potential XSS attempts
- **Spam Detection**: Basic spam pattern detection
- **CORS Protection**: Configured for specific origins
- **Error Handling**: Secure error messages without sensitive data exposure

## 📧 Email Features

### Notification Email (to you)
- Professional HTML template with contact details
- Formatted message display
- Direct reply button
- Timestamp and source information

### Auto-Reply Email (to sender)
- Branded confirmation email
- Response time expectations
- Social media links
- Professional signature

## 🎨 Email Templates

The server uses beautiful, responsive HTML email templates with:
- Modern gradient design matching your portfolio
- Mobile-friendly responsive layout
- Professional typography
- Clear call-to-action buttons
- Consistent branding

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `CLIENT_URL` | Frontend URL for CORS | No | http://localhost:3000 |
| `GMAIL_USER` | Gmail address | Yes | - |
| `GMAIL_APP_PASSWORD` | Gmail app password | Yes | - |
| `RECIPIENT_EMAIL` | Email to receive contact forms | No | Same as GMAIL_USER |

### Rate Limiting
- **Window**: 15 minutes
- **Max Requests**: 5 per IP
- **Headers**: Standard rate limit headers included

## 🚨 Error Handling

The server handles various error scenarios:
- **Validation Errors**: Invalid or missing form data
- **Authentication Errors**: Gmail SMTP authentication issues
- **Connection Errors**: Network or SMTP connection problems
- **Rate Limit Errors**: Too many requests from same IP
- **Server Errors**: Internal server errors with logging

## 📱 Frontend Integration

Update your React contact form to use this server:

```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      console.log('Message sent successfully!');
    } else {
      // Show error message
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

## 🔍 Testing

### Test Email Configuration
```bash
curl -X POST http://localhost:5000/api/test-email
```

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the API."
  }'
```

## 📦 Dependencies

### Production Dependencies
- **express**: Web framework
- **nodemailer**: Email sending library
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **express-rate-limit**: Rate limiting middleware

### Development Dependencies
- **nodemon**: Development server with hot reload

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production `CLIENT_URL`
3. Ensure Gmail credentials are secure
4. Set up proper logging

### Recommended Platforms
- **Heroku**: Easy deployment with environment variables
- **Vercel**: Serverless functions
- **Railway**: Simple deployment
- **DigitalOcean**: VPS deployment

## 📝 Logging

The server logs important events:
- Successful email sends
- Authentication errors
- Rate limit violations
- Server startup information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**"Authentication failed" error:**
- Verify Gmail App Password is correct
- Ensure 2FA is enabled on Gmail account
- Check GMAIL_USER email address

**"Connection refused" error:**
- Check internet connection
- Verify Gmail SMTP settings
- Try different port (587 vs 465)

**Rate limit errors:**
- Wait 15 minutes between test requests
- Check IP address restrictions
- Adjust rate limit settings if needed

**CORS errors:**
- Verify CLIENT_URL matches your frontend URL
- Check for trailing slashes in URLs
- Ensure proper headers are set

For more help, check the server logs or create an issue in the repository.