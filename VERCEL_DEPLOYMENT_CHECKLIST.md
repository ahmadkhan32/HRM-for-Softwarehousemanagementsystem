# ✅ Vercel Deployment Checklist - Complete Guide

## 🎯 Pre-Deployment Checklist

### 1. Root Directory Configuration

**Backend Project:**
- [ ] Go to Vercel Dashboard → Backend Project → Settings → General
- [ ] Set **Root Directory** to: `hrm-backend`
- [ ] Click **Save**

**Frontend Project:**
- [ ] Go to Vercel Dashboard → Frontend Project → Settings → General
- [ ] Set **Root Directory** to: `hrm-frontend`
- [ ] Click **Save**

---

### 2. Backend Environment Variables

**Location:** Vercel Dashboard → Backend Project → Settings → Environment Variables

Add these **11 variables** (select Production, Preview, Development for each):

| Key | Value | Required |
|-----|-------|----------|
| `PORT` | `5000` | ✅ |
| `NODE_ENV` | `production` | ✅ |
| `DB_HOST` | `sql100.byethost10.com` | ✅ |
| `DB_USER` | `b10_40637242` | ✅ |
| `DB_PASSWORD` | `d6ky275f` | ✅ |
| `DB_NAME` | `b10_40637242_hrm_sys` | ✅ |
| `DB_PORT` | `3306` | ✅ |
| `DB_CONNECT_TIMEOUT` | `20000` | ✅ |
| `DB_SKIP_CREATE` | `true` | ✅ |
| `JWT_SECRET` | `verystrongsecretkey123` | ✅ |
| `FRONTEND_URL` | `https://hrm-frontendd.vercel.app` | ✅ |

**Important:**
- Click **Save** after adding each variable
- Make sure all are set for **Production**, **Preview**, and **Development**

---

### 3. Frontend Environment Variables

**Location:** Vercel Dashboard → Frontend Project → Settings → Environment Variables

Add this **1 variable**:

| Key | Value | Required |
|-----|-------|----------|
| `VITE_API_URL` | `https://hrm-backend-xxx.vercel.app/api` | ✅ |

**Important:**
- Replace `xxx` with your actual backend deployment URL
- Must include `/api` at the end
- Set for **Production**, **Preview**, and **Development**

---

### 4. Deploy Both Projects

**Backend:**
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for build to complete (1-2 minutes)
4. Check build logs for any errors

**Frontend:**
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for build to complete (1-2 minutes)
4. Check build logs for any errors

---

## 🧪 Testing After Deployment

### Test Backend

1. **Root Endpoint:**
   - Visit: `https://hrm-backend-xxx.vercel.app`
   - Should see: `{"message":"API is running...","status":"ok"}`

2. **Health Check:**
   - Visit: `https://hrm-backend-xxx.vercel.app/api/health`
   - Should see: `{"status":"healthy","database":"connected"}`

3. **API Endpoint:**
   - Visit: `https://hrm-backend-xxx.vercel.app/api/auth/login` (POST)
   - Should not return 404

### Test Frontend

1. **Home Page:**
   - Visit: `https://hrm-frontendd.vercel.app`
   - Should see: Login page (not 404)

2. **Login:**
   - Use: `admin@hrm.com` / `admin123`
   - Should redirect to dashboard

3. **Check Console:**
   - Press F12 → Console tab
   - Should see API calls going to backend
   - No CORS errors

---

## ⚠️ About the Warnings

The npm warnings you see are **deprecation warnings**, not errors:
- ✅ Build will still succeed
- ✅ Application will still work
- ⚠️ These are just notices about outdated packages

**Common warnings:**
- `rimraf@2.7.1` - Deprecated (but still works)
- `multer@1.4.5` - Has vulnerabilities (but functional)
- `lodash.isequal@4.5.0` - Deprecated (but still works)

**These can be ignored for now.** We can update packages later if needed.

---

## 🐛 Troubleshooting

### Build Fails: "package.json not found"
- ✅ Check Root Directory is set to `hrm-backend` (backend) or `hrm-frontend` (frontend)
- ✅ Make sure no leading/trailing slashes
- ✅ Redeploy after setting root directory

### Backend Returns 500 Error
- ✅ Check all environment variables are set
- ✅ Verify database credentials are correct
- ✅ Check Function Logs in Vercel for specific error
- ✅ Make sure DB_SKIP_CREATE is set to `true`

### Frontend Can't Connect to Backend
- ✅ Check VITE_API_URL is set correctly
- ✅ Make sure it includes `/api` at the end
- ✅ Verify backend URL is correct
- ✅ Check CORS is configured in backend

### CORS Errors
- ✅ Make sure FRONTEND_URL is set in backend
- ✅ Verify frontend URL is in allowed origins
- ✅ Check browser console for exact error

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Backend shows: `{"message":"API is running...","status":"ok"}`
2. ✅ Frontend shows login page
3. ✅ Login works and redirects to dashboard
4. ✅ No errors in browser console
5. ✅ API calls succeed
6. ✅ No 404 or 500 errors

---

## 📝 Quick Reference

**Backend URL:** `https://hrm-backend-xxx.vercel.app`  
**Frontend URL:** `https://hrm-frontendd.vercel.app`

**Backend Root Directory:** `hrm-backend`  
**Frontend Root Directory:** `hrm-frontend`

**Login Credentials:**
- Admin: `admin@hrm.com` / `admin123`
- Manager: `manager@hrm.com` / `manager123`
- Employee: `employee1@hrm.com` / `employee123`

---

## 🚀 Deployment Steps Summary

1. ✅ Set Root Directory for both projects
2. ✅ Add all environment variables
3. ✅ Redeploy both projects
4. ✅ Test endpoints
5. ✅ Verify login works
6. ✅ Done! 🎉

---

## 📞 Need Help?

If something doesn't work:
1. Check **Function Logs** in Vercel
2. Check **Build Logs** for errors
3. Check **Browser Console** for frontend errors
4. Verify all environment variables are set
5. Make sure Root Directory is correct

The code is ready - just need to configure Vercel correctly!

