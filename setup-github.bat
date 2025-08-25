@echo off
echo 🚀 Setting up GitHub repository for Portfolio...
echo.

echo 📁 Initializing Git repository...
git init

echo 📝 Adding all files...
git add .

echo 💾 Creating initial commit...
git commit -m "Initial commit: Full-stack portfolio with contact form and admin panel"

echo.
echo ✅ Git repository initialized!
echo.
echo 🌐 Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a repository named 'portfolio'
echo 3. Don't initialize with README
echo 4. Copy the repository URL
echo 5. Run: git remote add origin [YOUR_REPO_URL]
echo 6. Run: git push -u origin main
echo.
pause