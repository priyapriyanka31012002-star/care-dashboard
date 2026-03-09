# 🚀 Deployment Guide — Care Dashboard

Complete step-by-step guide to deploy the Care Dashboard with authentication and persistent data storage.

---

## Overview

| Component | Service | Cost |
|-----------|---------|------|
| **Hosting** | Vercel (Hobby) | Free |
| **Auth + Database** | Supabase (Free tier) | Free |
| **Source Control** | GitHub | Free |

---

## Step 1: Create a Supabase Project

1. Go to **[supabase.com](https://supabase.com)** and sign in (use GitHub login)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `care-dashboard`
   - **Database Password**: choose a strong password (save it somewhere safe)
   - **Region**: pick the closest to your location
4. Click **"Create new project"** and wait ~2 minutes for setup

---

## Step 2: Create the Database Table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `supabase-setup.sql` and paste it
4. Click **"Run"** — you should see "Success" messages
5. Go to **Table Editor** → verify you see a `user_data` table

---

## Step 3: Get Your API Keys

1. In Supabase, go to **Settings** → **API** (under Configuration)
2. Copy these two values:
   - **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`

---

## Step 4: Update index.html with Your Keys

Open `index.html` and find these lines (search for `YOUR_SUPABASE_URL`):

```javascript
const SUPABASE_URL='YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY='YOUR_SUPABASE_ANON_KEY';
```

Replace with your actual values:

```javascript
const SUPABASE_URL='https://xxxxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

> **Note**: The anon key is safe to include in client-side code — Supabase Row Level Security (RLS) protects your data so users can only access their own records.

---

## Step 5: Configure Supabase Auth

1. In Supabase, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Optional: Under **Authentication** → **URL Configuration**:
   - Set **Site URL** to your Vercel domain (e.g., `https://your-app.vercel.app`)
   - Add redirect URLs if needed

### Email Confirmation (Optional)
- By default, Supabase requires email verification
- To disable (for testing): **Authentication** → **Providers** → **Email** → Turn off "Confirm email"
- For production: keep it enabled for security

---

## Step 6: Push to GitHub

If your code isn't already on GitHub:

```bash
cd "c:\Users\priya\OneDrive\Documents\CHECKLIST"
git init
git add .
git commit -m "Care Dashboard with auth and database"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/care-dashboard.git
git push -u origin main
```

Or just upload the files manually through GitHub's web interface.

---

## Step 7: Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in
2. Click **"Add New..."** → **"Project"**
3. **Import** your GitHub repository
4. Settings should auto-detect:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (default)
5. Click **"Deploy"**
6. Wait for the build to complete (~30 seconds)
7. Your site is live! 🎉

---

## Step 8: Test Everything

1. Visit your Vercel URL (e.g., `https://care-dashboard.vercel.app`)
2. You should see the **Login Page**
3. Click **"Sign Up"** to create an account
4. Check your email for verification (if enabled)
5. Sign in and use the dashboard
6. Data auto-saves every 60 seconds
7. Try logging out and back in — your data should persist!

---

## How It Works

### Authentication Flow
```
User visits site → Supabase checks session
  ├── Has valid session → Load user data → Show Dashboard
  └── No session → Show Login Page
        ├── Sign In → Verify credentials → Load data → Dashboard
        └── Sign Up → Create account → Verify email → Sign In
```

### Data Persistence
- **Auto-save**: Every 60 seconds while logged in
- **Manual save**: Click the 💾 Save button in the header
- **Page unload**: Saves when you close/refresh the tab
- **Per-day storage**: Data is stored per user per day
- **Format**: All app state serialized as JSON in PostgreSQL

### Security
- **Row Level Security (RLS)**: Users can only read/write their own data
- **Anon Key**: Public key that only works with RLS policies
- **Session tokens**: Managed by Supabase Auth (stored in localStorage)
- **Password hashing**: Handled by Supabase (bcrypt)

---

## Demo Mode

If Supabase is not configured (keys are still `YOUR_SUPABASE_URL`):
- App runs in **Demo Mode** with a yellow banner
- No login required
- All data is in-memory only (lost on refresh)
- Great for testing the UI before setting up the backend

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid API key" error | Double-check your SUPABASE_URL and SUPABASE_ANON_KEY |
| Can't sign up | Check if email provider is enabled in Supabase Auth settings |
| Email verification not arriving | Check spam folder, or disable email confirmation in Supabase |
| Data not saving | Verify the `user_data` table exists and RLS policies are created |
| Blank page on Vercel | Check browser console for errors; verify `vercel.json` is in root |
| "relation user_data does not exist" | Run the SQL setup script in Supabase SQL Editor |

---

## Updating the App

After making changes:
1. Commit and push to GitHub
2. Vercel auto-deploys from your main branch
3. Live in ~30 seconds

```bash
git add .
git commit -m "Update dashboard"
git push
```

---

## Free Tier Limits

| Service | Limit | Typical Usage |
|---------|-------|---------------|
| **Vercel Hobby** | 100 GB bandwidth/month | More than enough |
| **Supabase Free** | 500 MB database | ~years of daily data |
| **Supabase Free** | 50,000 monthly active users | More than enough |
| **Supabase Free** | Unlimited API requests | More than enough |

Your care dashboard will comfortably run within free tier limits.
