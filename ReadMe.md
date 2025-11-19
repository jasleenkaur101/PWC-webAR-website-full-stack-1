# PWC WebAR Business Cards - Full Stack Application

A full-stack web application for managing AI-powered AR business cards with Ready Player Me avatars and ConvAI characters, integrated with 8th Wall WebAR.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Production Deployment (Render)](#production-deployment-render)
- [8th Wall Integration](#8th-wall-integration)
- [Database Management](#database-management)
- [User Workflow](#user-workflow)
- [Troubleshooting](#troubleshooting)

---

## Overview

This application allows users to:
1. Register and create an account
2. Configure their Ready Player Me avatar
3. Set up their ConvAI character
4. Generate a unique 8th Wall AR experience URL
5. Share via QR code for AR business card experiences

**Architecture:**
```
┌─────────────┐
│Business Card│
│  QR Code    │
└──────┬──────┘
       │ User scans
       ▼
┌─────────────────┐
│  8th Wall App   │
│  (WebAR)        │
└────────┬────────┘
         │ Fetches user data
         ▼
┌──────────────────┐
│ Backend API      │
│ (Express + DB)   │
└────────┬─────────┘
         │ Returns
         ▼
┌──────────────────┐
│ Avatar + ConvAI  │
│ Character Loads  │
└──────────────────┘
```

---

## Tech Stack

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** SQLite + Prisma ORM
- **Auth:** JWT (JSON Web Tokens)
- **Security:** bcrypt, helmet, CORS

### Frontend
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Custom CSS with Tailwind utilities
- **QR Generation:** qrcode.react

### 8th Wall (Separate Project)
- **Platform:** 8th Wall WebAR
- **3D Engine:** A-Frame
- **Avatar:** Ready Player Me GLB models
- **AI:** ConvAI integration

---

## Project Structure
```
PWC-webAR-website-full-stack/
├── server/                 # Backend (Express + Prisma)
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, error handling
│   │   ├── routes/         # API routes
│   │   ├── prisma/         # Database schema
│   │   ├── env.ts          # Environment config
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── legacy-styles/  # CSS files
│   │   ├── api.js          # API client
│   │   ├── config.js       # Frontend config
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── package.json            # Root workspace config
├── .gitignore
└── README.md
```

---

## Prerequisites

- **Node.js:** v18 or higher
- **npm:** v8 or higher
- **Git:** For cloning the repository
- **8th Wall Account:** For WebAR project hosting
- **Ready Player Me Account:** For avatar creation
- **ConvAI Account:** For AI character setup

---

## Local Development Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/ak471909/PWC-webAR-website-full-stack.git
cd PWC-webAR-website-full-stack
```

### Step 2: Install Dependencies

Install all dependencies (root, server, and frontend):
```bash
npm install
```

This installs dependencies for all workspaces.

### Step 3: Setup Backend Environment

Create environment file:
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secure-random-secret-key-here"
NODE_ENV="development"
PORT=5174
```

### Step 4: Initialize Database
```bash
# Still in server directory
npx prisma migrate dev --name init
npx prisma generate
```

This creates the SQLite database and generates Prisma Client.

### Step 5: Setup Frontend Environment
```bash
cd ../frontend
echo 'VITE_API_URL="http://localhost:5174/api"' > .env
```

### Step 6: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs at: `http://localhost:5174`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: `http://localhost:5173`

### Step 7: Access the Application

Open browser and go to: `http://localhost:5173`

You should see the login page. Click "Register" to create your first account.

---

## Production Deployment (Render)

### Prerequisites
- GitHub repository with your code
- Render account (free tier works)

### Step 1: Create PostgreSQL Database on Render

**IMPORTANT:** You must create the database BEFORE creating the web service.

1. Go to [render.com](https://render.com)
2. Click "New +" → "PostgreSQL"
3. Configure database:
   - **Name:** `pwc-webar-database`
   - **Database:** `pwcwebar` (auto-generated)
   - **User:** `pwcwebar_user` (auto-generated)
   - **Region:** Choose closest to you
   - **Instance Type:** Free
4. Click "Create Database"
5. Wait for provisioning (~2 minutes)
6. **Copy the "Internal Database URL"** - you'll need this for the web service

### Step 2: Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Create Web Service on Render

1. Still on [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:

**Basic Settings:**
- **Name:** `pwc-webar-website-full-stack`
- **Region:** Same region as your database
- **Branch:** `main`
- **Root Directory:** Leave blank
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:**
```bash
npm install --include=dev && npm run build && cd server && npx prisma generate && npx prisma migrate deploy
```
- **Start Command:**
```bash
npm run -w server dev
```

**Environment Variables:**
Add these in the "Environment" tab:
- `DATABASE_URL` = **[Paste Internal Database URL from Step 1]**
- `JWT_SECRET` = `your-production-secret-key-min-16-chars`
- `NODE_ENV` = `production`

### Step 4: Deploy

Click "Create Web Service" and wait for deployment (5-10 minutes).

**Verify deployment:**
1. Check logs for: `Migration applied successfully`
2. Look for: `Your service is live 🎉`
3. Your app will be available at: `https://pwc-webar-website-full-stack.onrender.com`

### Step 5: Test Database Persistence

1. Visit your production URL and register a test user
2. Go to Render dashboard → Click your service → Manual Deploy → "Clear build cache & deploy"
3. After redeployment, try logging in with the same user
4. ✅ If login works, your database is persistent!

---
## 8th Wall Integration

### Update Backend URL in 8th Wall Project

**File: `app.js`** in your 8th Wall project

For local testing:
```javascript
const BACKEND_API_URL = 'http://localhost:5174/api'
```

For production (after Render deployment):
```javascript
const BACKEND_API_URL = 'https://your-service-name.onrender.com/api'
```

### Testing the AR Experience

**Local testing:**
1. Make sure backend is running locally
2. Update 8th Wall `app.js` to point to `localhost:5174/api`
3. Visit: `https://pwcarbusinesscards.8thwall.app/further-testing-branch-2/?userId=YOUR_EXPERIENCE_ID`

**Production testing:**
1. Update 8th Wall `app.js` to point to your Render URL
2. Republish 8th Wall project
3. Scan QR code or visit URL on phone

---

## Database Management

### Local Database (Development)

**View/Edit Database:**
```bash
cd server
npx prisma studio
```
Opens GUI at `http://localhost:5555`

**Run Migrations:**
```bash
cd server
npx prisma migrate dev --name migration_name
```

### Production Database (Render)

**Via Admin Dashboard:**
1. Login to your deployed app
2. Navigate to `/admin`
3. View all users and manage them

**Via API (temporary endpoints):**

View all users:
```
https://your-service-name.onrender.com/api/user/admin/all
```

Note: Must be logged in (authenticated) to access admin endpoints.

---

## User Workflow

### For End Users:

1. **Register Account**
   - Visit: `https://your-app.onrender.com/register`
   - Create account with email/password
   - Note your unique Experience ID

2. **Setup Avatar**
   - Navigate to "Avatars" page
   - Create avatar at [Ready Player Me](https://readyplayer.me)
   - Copy GLB URL and paste in app
   - Click "Save Avatar URL"

3. **Setup ConvAI Character**
   - Navigate to "Convai" page
   - Create character at [ConvAI](https://convai.com)
   - Copy Character ID
   - Paste in app and save

4. **Generate AR Experience**
   - Navigate to "AI Business Card" page
   - Click "Generate URL"
   - QR code is generated automatically
   - Share QR code or URL

5. **Test AR Experience**
   - Scan QR code with phone
   - Or visit URL: `https://8thwall-url/?userId=YOUR_ID`
   - Point camera at image target
   - Avatar appears with ConvAI integration

### For Administrators:

1. **Login** to the app
2. Navigate to `/admin`
3. View all registered users
4. Delete users if needed
5. Monitor user configurations

---

## Troubleshooting

### Common Issues

**Issue: "Failed to fetch" errors**
- Check if backend is running
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in `server/src/index.ts`

**Issue: Database tables don't exist**
- Run: `npx prisma migrate deploy`
- Or run: `npx prisma migrate dev --name init`

**Issue: Can't save ConvAI or Avatar**
- Check browser console for errors
- Verify you're logged in (check for JWT token)
- Test API endpoint directly: `/api/user/profile`

**Issue: 8th Wall can't connect to backend**
- Verify `BACKEND_API_URL` in 8th Wall `app.js`
- Check Render deployment logs
- Test API health: `https://your-app.onrender.com/api/health`

**Issue: AR experience shows wrong avatar**
- Verify Experience ID matches user in database
- Check if ConvAI ID and RPM URL are saved
- Test API: `https://your-app.onrender.com/api/user/experience/YOUR_ID`

**Issue: Build fails on Render**
- Check build logs for specific errors
- Verify `package.json` scripts are correct
- Ensure migration files are committed to git
- Check that `.gitignore` doesn't block necessary files

### Debugging Tips

**Check Backend Logs (Local):**
```bash
cd server
npm run dev
# Watch console output
```

**Check Frontend Logs:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

**Check Render Logs:**
1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. View real-time logs

**Test API Endpoints:**
```bash
# Health check
curl https://your-app.onrender.com/api/health

# Get user by experience ID
curl https://your-app.onrender.com/api/user/experience/123456
```

---

### Database & Deployment Issues

**Issue: Database resets after deployment**
- This means you're using SQLite (`file:./dev.db`) in production
- Solution: Follow Step 1 in Production Deployment to create PostgreSQL database
- Update `DATABASE_URL` environment variable to use PostgreSQL URL

**Issue: QR code doesn't show on Business Card page**
- Check browser console for CSP errors
- Verify `helmet` configuration in `server/src/index.ts` includes:
```typescript
  "img-src": ["'self'", "data:", "https://api.qrserver.com"]
```

**Issue: "No migration found" during deployment**
- Ensure `server/prisma/migrations/` folder exists in git
- Check that migration files are committed
- Verify `migration_lock.toml` has `provider = "postgresql"`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (authenticated)
- `GET /api/auth/check-email?email=` - Check if email exists
- `GET /api/auth/security-questions?email=` - Get security questions
- `POST /api/auth/reset-with-security-answers` - Reset password

### User Profile
- `GET /api/user/profile` - Get user profile (authenticated)
- `PATCH /api/user/profile` - Update profile (authenticated)
- `GET /api/user/experience/:experienceId` - Get user by experience ID

### Admin
- `GET /api/user/admin/all` - Get all users (authenticated)
- `DELETE /api/user/admin/:userId` - Delete user (authenticated)

---

## Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
NODE_ENV="development"
PORT=5174
```

### Frontend (`frontend/.env`)
```env
# Development
VITE_API_URL="http://localhost:5174/api"

# Production
VITE_API_URL="https://your-service-name.onrender.com/api"
```

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

---

## License

This project is proprietary software for PWC WebAR Business Cards.

---

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review Render deployment logs
- Check 8th Wall console logs
- Contact the development team

---

## Additional Resources

- [8th Wall Documentation](https://www.8thwall.com/docs)
- [Ready Player Me Docs](https://docs.readyplayer.me)
- [ConvAI Documentation](https://docs.convai.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Render Documentation](https://render.com/docs)
