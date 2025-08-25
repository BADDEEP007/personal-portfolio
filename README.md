# 🌟 Portfolio with Contact Form & Analytics

A modern portfolio website with contact form, email notifications, and admin analytics dashboard.

## ✨ Features

- 📧 **Contact Form** with email notifications
- 📊 **Admin Analytics Dashboard** 
- 🔐 **JWT Authentication** for admin access
- 🔥 **Firebase Integration** for data logging
- 📱 **Responsive Design** for all devices
- 🛡️ **Security Features** (rate limiting, input sanitization)

## 🚀 Quick Deploy

### Deploy Backend
[![Deploy Backend to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BADDEEP007/portfolio&project-name=portfolio-backend&root-directory=server)

### Deploy Frontend  
[![Deploy Frontend to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BADDEEP007/portfolio&project-name=portfolio-frontend)

## 🔧 Manual Deployment

### Prerequisites
- Node.js 16+
- Firebase project
- Gmail app password
- Vercel account

### Backend Deployment
```bash
cd server
vercel --prod
```

### Frontend Deployment
```bash
npm run build
vercel --prod
```

## ⚙️ Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
FIREBASE_PROJECT_ID=your-project-id
JWT_SECRET=your-jwt-secret
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## 🎯 Admin Access

- **URL**: `https://your-site.vercel.app/admin`
- **Username**: `Toki007`
- **Password**: `Baddeep007`

## 📊 Features Overview

### Contact Form
- Real-time validation
- Email notifications
- Auto-reply messages
- Spam protection

### Admin Dashboard
- Contact submissions analytics
- Daily/weekly/monthly stats
- Email domain analysis
- Status management
- Real-time updates

### Security
- JWT authentication
- Rate limiting
- Input sanitization
- CORS protection
- Environment-based configuration

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: JWT
- **Email**: Nodemailer + Gmail SMTP
- **Deployment**: Vercel

## 📝 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📞 Support

For issues or questions, please open an issue on GitHub or contact via the portfolio contact form.