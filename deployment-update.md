# Update these URLs after deployment

## Backend (server.js)
```javascript
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-actual-netlify-url.netlify.app"],
    credentials: true,
  })
);
```

## Frontend (.env)
```bash
REACT_APP_API_URL=https://your-actual-vercel-url.vercel.app
```

## Vercel Environment Variables
```bash
CLIENT_URL=https://your-actual-netlify-url.netlify.app
```