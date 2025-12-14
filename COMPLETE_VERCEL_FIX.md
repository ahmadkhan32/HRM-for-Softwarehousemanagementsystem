# 🔧 Complete Vercel Fix - Step by Step

## ❌ Current Error
```
npm error enoent Could not read package.json
```

## ✅ SOLUTION - Follow These Steps Exactly

### STEP 1: Fix Root Directory in Vercel Dashboard

#### For Backend Project (`hrm-frontend-lac`):

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Backend Project** (hrm-frontend-lac)
3. Click **Settings** (gear icon, top right)
4. Click **General** (left sidebar)
5. Scroll down to **Root Directory**
6. Click **Edit** button
7. **Clear** any existing value
8. Type: `hrm-backend` (exactly this, no slash)
9. Click **Save**

#### For Frontend Project (`hrm-frontendd`):

1. Click on **Frontend Project** (hrm-frontendd)
2. Click **Settings** → **General**
3. Scroll to **Root Directory**
4. Click **Edit**
5. Type: `hrm-frontend` (exactly this, no slash)
6. Click **Save**

---

### STEP 2: Add Environment Variables

#### Backend Project Environment Variables:

Go to: **Backend Project** → **Settings** → **Environment Variables**

Add these **10 variables** (one by one):

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

**Important:** 
- Select **Production**, **Preview**, and **Development** for all variables
- Click **Save** after each variable

#### Frontend Project Environment Variables:

Go to: **Frontend Project** → **Settings** → **Environment Variables**

Add this **1 variable**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://hrm-frontend-lac.vercel.app/api` |

**Important:** 
- Include `/api` at the end
- Select **Production**, **Preview**, and **Development**
- Click **Save**

---

### STEP 3: Redeploy Both Projects

#### Backend:
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

#### Frontend:
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

### STEP 4: Verify Deployment

#### Test Backend:
1. Visit: `https://hrm-frontend-lac.vercel.app`
2. Should see: `{"message":"API is running...","status":"ok","timestamp":"..."}`
3. If you see 404, wait 1-2 minutes and try again

#### Test Frontend:
1. Visit: `https://hrm-frontendd.vercel.app`
2. Should see: Login page
3. If you see 404, wait 1-2 minutes and try again

#### Test Login:
1. Go to: `https://hrm-frontendd.vercel.app/login`
2. Use: `admin@hrm.com` / `admin123`
3. Should redirect to dashboard

---

## 🔐 Login Credentials

After database is seeded, use these:

- **Admin:** `admin@hrm.com` / `admin123`
- **Manager:** `manager@hrm.com` / `manager123`
- **Employee 1:** `employee1@hrm.com` / `employee123`
- **Employee 2:** `employee2@hrm.com` / `employee123`

---

## ⚠️ Common Mistakes to Avoid

1. ❌ **Wrong Root Directory:**
   - Don't use: `/hrm-backend` (with slash)
   - Use: `hrm-backend` (no slash)

2. ❌ **Wrong VITE_API_URL:**
   - Don't use: `https://hrm-frontend-lac.vercel.app` (missing /api)
   - Use: `https://hrm-frontend-lac.vercel.app/api` (with /api)

3. ❌ **Missing Environment Variables:**
   - Make sure ALL 10 backend variables are added
   - Make sure frontend has VITE_API_URL

4. ❌ **Not Redeploying:**
   - After setting root directory, you MUST redeploy
   - After adding environment variables, you MUST redeploy

---

## 🐛 If Still Getting Errors

### Error: "package.json not found"
- ✅ Check Root Directory is set correctly
- ✅ Make sure it's `hrm-backend` (not `/hrm-backend` or `./hrm-backend`)
- ✅ Redeploy after changing root directory

### Error: "404 on backend"
- ✅ Check all environment variables are set
- ✅ Wait 2-3 minutes after deployment
- ✅ Check Vercel build logs for errors

### Error: "CORS error"
- ✅ Make sure `FRONTEND_URL` is set in backend
- ✅ Make sure frontend URL is in CORS allowed origins
- ✅ Check browser console for exact error

### Error: "Database connection failed"
- ✅ Verify all DB_* environment variables are correct
- ✅ Check ByteHost database is accessible
- ✅ Verify DB_SKIP_CREATE is set to `true`

---

## 📋 Checklist

Before deploying, make sure:

- [ ] Root Directory set to `hrm-backend` (backend project)
- [ ] Root Directory set to `hrm-frontend` (frontend project)
- [ ] All 10 backend environment variables added
- [ ] Frontend `VITE_API_URL` environment variable added
- [ ] Both projects redeployed
- [ ] Backend URL works: `https://hrm-frontend-lac.vercel.app`
- [ ] Frontend URL works: `https://hrm-frontendd.vercel.app`
- [ ] Login works with test credentials

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Backend shows: `{"message":"API is running...","status":"ok"}`
2. ✅ Frontend shows login page (not 404)
3. ✅ Login works and redirects to dashboard
4. ✅ No errors in browser console
5. ✅ API calls go to: `https://hrm-frontend-lac.vercel.app/api/...`

---

## 🆘 Still Need Help?

1. Check **Vercel Build Logs**:
   - Go to Deployments → Click on deployment → View Function Logs
   - Look for any red errors

2. Check **Browser Console**:
   - Press F12 → Console tab
   - Look for CORS or API errors

3. Verify **Environment Variables**:
   - Settings → Environment Variables
   - Make sure all are present and correct

4. **Redeploy** after any changes

