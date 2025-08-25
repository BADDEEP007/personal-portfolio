#!/bin/bash

echo "🚀 Setting up GitHub repository for Portfolio..."
echo

echo "📁 Initializing Git repository..."
git init

echo "📝 Adding all files..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial commit: Full-stack portfolio with contact form and admin panel

Features:
- React.js frontend with responsive design
- Node.js/Express backend with email service  
- Firebase integration for data logging
- JWT authentication for admin panel
- Contact form with Gmail SMTP
- Analytics dashboard with real-time data
- Rate limiting and security features"

echo
echo "✅ Git repository initialized!"
echo
echo "🌐 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a repository named 'portfolio'"
echo "3. Don't initialize with README"
echo "4. Copy the repository URL"
echo "5. Run: git remote add origin [YOUR_REPO_URL]"
echo "6. Run: git push -u origin main"
echo

# If GitHub CLI is available, offer to create repo automatically
if command -v gh &> /dev/null; then
    echo "🎯 GitHub CLI detected! Want to create repo automatically? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "🔐 Please login to GitHub first..."
        gh auth login
        echo "📦 Creating repository..."
        gh repo create portfolio --public --description "Modern portfolio with contact form and admin analytics" --push --source .
        echo "🎉 Repository created and code pushed!"
    fi
fi