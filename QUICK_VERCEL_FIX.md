# ⚡ Quick Fix: Vercel package.json Error

## 🚨 Error
```
npm error enoent Could not read package.json
```

## ✅ SOLUTION (2 minutes)

### Step 1: Set Root Directory for Backend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Backend Project** (`hrm-frontend-lac`)
3. Click **Settings** (top right)
4. Click **General** (left sidebar)
5. Scroll down to **Root Directory**
6. Click **Edit**
7. Type: `hrm-backend`
8. Click **Save**

### Step 2: Set Root Directory for Frontend

1. Click on your **Frontend Project** (`hrm-frontendd`)
2. Click **Settings** → **General**
3. Scroll to **Root Directory**
4. Click **Edit**
5. Type: `hrm-frontend`
6. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger auto-deploy

## ✅ That's It!

After setting the root directory, Vercel will:
- ✅ Find `package.json` in the correct folder
- ✅ Run `npm install` automatically
- ✅ Build and deploy successfully

## 📸 Visual Guide

**Backend Project Settings:**
```
Settings → General → Root Directory → hrm-backend
```

**Frontend Project Settings:**
```
Settings → General → Root Directory → hrm-frontend
```

## ⚠️ Important

- You must set this for **BOTH** projects separately
- This is a **one-time** configuration
- After setting, all future deployments will use the correct directory

## 🧪 Test

After redeploying, check:
- ✅ Build logs show "Installing dependencies" without errors
- ✅ Backend URL works: `https://hrm-frontend-lac.vercel.app`
- ✅ Frontend URL works: `https://hrm-frontendd.vercel.app`

