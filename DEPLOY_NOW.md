# 🚀 Deploy to Vercel - Quick Steps

## ⚡ Fast Deployment (5 Minutes)

### Step 1: Set Root Directory (2 min)

**Backend:**
1. Vercel Dashboard → **hrm-backend** project
2. **Settings** → **General**
3. **Root Directory** → Edit → Type: `hrm-backend` → Save

**Frontend:**
1. Vercel Dashboard → **hrm-frontendd** project  
2. **Settings** → **General**
3. **Root Directory** → Edit → Type: `hrm-frontend` → Save

---

### Step 2: Add Environment Variables (2 min)

**Backend Project → Settings → Environment Variables:**

Copy and paste these (one by one):

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

**Frontend Project → Settings → Environment Variables:**

```
VITE_API_URL=https://hrm-backend-xxx.vercel.app/api
```
*(Replace `xxx` with your actual backend URL)*

---

### Step 3: Redeploy (1 min)

**Both Projects:**
1. Go to **Deployments** tab
2. Click **Redeploy** button
3. Wait 1-2 minutes
4. Done! ✅

---

## ✅ Test

1. **Backend:** `https://hrm-backend-xxx.vercel.app` → Should show API message
2. **Frontend:** `https://hrm-frontendd.vercel.app` → Should show login page
3. **Login:** `admin@hrm.com` / `admin123` → Should work!

---

## ⚠️ About Warnings

The npm warnings are **normal** - they're just deprecation notices. Your build will still work! ✅

---

## 🎯 That's It!

Follow these 3 steps and your app will be live! 🚀

