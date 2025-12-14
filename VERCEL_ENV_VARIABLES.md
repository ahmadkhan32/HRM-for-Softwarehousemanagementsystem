# Vercel Environment Variables Configuration

## 🎯 Quick Setup Guide

### Backend Vercel Project (`hrm-frontend-lac.vercel.app`)

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

```
PORT=5000
NODE_ENV=production
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_CONNECT_TIMEOUT=20000
DB_SKIP_CREATE=true
JWT_SECRET=verystrongsecretkey123
FRONTEND_URL=https://hrm-frontendd.vercel.app
```

### Frontend Vercel Project (`hrm-frontendd.vercel.app`)

Add this environment variable in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://hrm-frontend-lac.vercel.app/api
```

## 📋 Step-by-Step Instructions

### For Backend (hrm-frontend-lac.vercel.app):

1. Go to Vercel Dashboard
2. Select your **Backend Project** (hrm-frontend-lac.vercel.app)
3. Go to **Settings** → **Environment Variables**
4. Add each variable one by one:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `DB_HOST` | `sql100.byethost10.com` |
| `DB_USER` | `b10_40637242` |
| `DB_PASSWORD` | `d6ky275f` |
| `DB_NAME` | `b10_40637242_hrm_sys` |
| `DB_PORT` | `3306` |
| `DB_CONNECT_TIMEOUT` | `20000` |
| `DB_SKIP_CREATE` | `true` |
| `JWT_SECRET` | `verystrongsecretkey123` |
| `FRONTEND_URL` | `https://hrm-frontendd.vercel.app` |

5. Select **All Environments** (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** the project

### For Frontend (hrm-frontendd.vercel.app):

1. Go to Vercel Dashboard
2. Select your **Frontend Project** (hrm-frontendd.vercel.app)
3. Go to **Settings** → **Environment Variables**
4. Add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://hrm-frontend-lac.vercel.app/api` |

5. Select **All Environments** (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** the project

## ✅ Verification

After adding environment variables and redeploying:

1. **Test Backend**: Visit `https://hrm-frontend-lac.vercel.app` - should show "API is running..."
2. **Test Frontend**: Visit `https://hrm-frontendd.vercel.app` - should load the login page
3. **Test Connection**: Try logging in from frontend - should connect to backend API

## 🔧 Important Notes

- ✅ Backend uses **ByteHost database** (already configured)
- ✅ CORS is configured to allow frontend domain
- ✅ All environment variables must be set before deployment
- ✅ After adding variables, **redeploy** is required
- ✅ Frontend URL must include `/api` at the end

## 🐛 Troubleshooting

If frontend can't connect to backend:
1. Check `VITE_API_URL` is set correctly: `https://hrm-frontend-lac.vercel.app/api`
2. Verify backend is running: Visit `https://hrm-frontend-lac.vercel.app`
3. Check browser console (F12) for CORS errors
4. Verify CORS in backend allows frontend domain

If database connection fails:
1. Verify all DB_* environment variables are set
2. Check ByteHost database is accessible
3. Verify DB_SKIP_CREATE=true (for hosted databases)

