# 🚀 Deployment Guide

## Quick Deployment Commands

### Backend Deployment (Vercel)
```bash
# Deploy backend from /server folder
cd server
vercel --prod --name portfolio-backend
```

### Frontend Deployment (Vercel)
```bash
# Deploy frontend from root directory
npm run build
vercel --prod --name portfolio-frontend
```

### Alternative: Deploy Both with One Command
```bash
# Deploy backend
cd server && vercel --prod && cd ..

# Deploy frontend  
vercel --prod
```

## Environment Variables Setup

### Backend Environment Variables (Vercel Dashboard)
```
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
GMAIL_USER=pradeepargal22@gmail.com
GMAIL_APP_PASSWORD=gfio rqig hafp ybv
RECIPIENT_EMAIL=pradeepargal22@gmail.com
FIREBASE_PROJECT_ID=baddeep-99c4b
FIREBASE_PRIVATE_KEY_ID=2860b348c61e87f1487c68a7e2b3e517fa381ee8
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@baddeep-99c4b.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=114554060865495936059
JWT_SECRET=K9mP2xR7vN4qL8wE3tY6uI1oA5sD9fG2
ADMIN_USERNAME=Toki007
ADMIN_PASSWORD=Baddeep007
```

### Frontend Environment Variables (Vercel Dashboard)
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## Post-Deployment Checklist

### ✅ Backend Verification
- [ ] API endpoints respond correctly
- [ ] Environment variables loaded
- [ ] Firebase connection working
- [ ] Email service functional
- [ ] CORS configured for frontend domain

### ✅ Frontend Verification  
- [ ] Site loads correctly
- [ ] Contact form submits successfully
- [ ] Admin panel login works
- [ ] Analytics dashboard displays data
- [ ] All routes work properly

### ✅ Integration Testing
- [ ] Contact form sends emails
- [ ] Data logs to Firebase
- [ ] Admin authentication works
- [ ] Protected routes secured
- [ ] Real-time analytics update

## Troubleshooting

### Common Issues:
1. **CORS Error**: Update CLIENT_URL in backend env vars
2. **API Not Found**: Check REACT_APP_API_URL in frontend
3. **Firebase Error**: Verify Firebase credentials
4. **Email Error**: Check Gmail app password
5. **Auth Error**: Verify JWT_SECRET is set

### Debug Commands:
```bash
# Check backend health
curl https://your-backend-url.vercel.app/api/health

# Test contact form
curl -X POST https://your-backend-url.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

## Domain Configuration

### Custom Domain (Optional)
1. Go to Vercel Dashboard
2. Add custom domain
3. Update environment variables with new domain
4. Update CORS settings

### SSL Certificate
- Automatically handled by Vercel
- HTTPS enforced by default