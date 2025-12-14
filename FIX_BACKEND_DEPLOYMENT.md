# 🔧 Fix Backend Deployment - Simple Steps

## The Problem
Vercel can't find `package.json` because it's looking in the wrong folder.

## The Solution
Set the **Root Directory** in Vercel Dashboard to `hrm-backend`

---

## 📋 Step-by-Step (2 Minutes)

### 1. Open Vercel Dashboard
- Go to: https://vercel.com/dashboard
- Login if needed

### 2. Select Backend Project
- Click on **"hrm-backend"** project
- (It's in "Ahmad's projects")

### 3. Go to Settings
- Click **"Settings"** button (top right, looks like a gear ⚙️)
- Or click **"Settings"** in the left sidebar menu

### 4. Open General Settings
- Click **"General"** tab (left sidebar)
- Scroll down the page

### 5. Find Root Directory
- Look for **"Root Directory"** section
- It might say "Leave empty to use repository root"
- Click the **"Edit"** button next to it

### 6. Set Root Directory
- **Delete** any existing text in the input field
- Type exactly: `hrm-backend`
- **Important:** 
  - ✅ Use: `hrm-backend`
  - ❌ Don't use: `/hrm-backend`
  - ❌ Don't use: `hrm-backend/`
  - ❌ Don't use: `./hrm-backend`
- Click **"Save"** button

### 7. Redeploy
- Click **"Deployments"** tab (top menu)
- Find the latest deployment (the one that failed)
- Click **"⋯"** (three dots menu) on the right
- Click **"Redeploy"**
- Or click the **"Redeploy"** button at the top of the page

### 8. Wait and Check
- Wait 1-2 minutes for the build to complete
- Check the build logs
- Should see: "Installing dependencies..."
- Should see: "Build completed successfully"
- ✅ No more "package.json not found" error!

---

## ✅ Success Indicators

You'll know it worked when:

1. ✅ Build logs show: "Installing dependencies..."
2. ✅ No "package.json not found" error
3. ✅ Build status changes to "Ready" (green)
4. ✅ Backend URL works: `https://hrm-backend-xxx.vercel.app`

---

## 🎯 Quick Reference

**What to set:**
- Root Directory: `hrm-backend`

**Where to set it:**
- Vercel Dashboard → hrm-backend project → Settings → General → Root Directory

**After setting:**
- Must click "Save"
- Must redeploy the project

---

## ⚠️ Common Mistakes

1. **Wrong value:**
   - ❌ `/hrm-backend` (with leading slash)
   - ❌ `hrm-backend/` (with trailing slash)
   - ✅ `hrm-backend` (correct)

2. **Not saving:**
   - Must click "Save" after typing
   - Changes don't apply until saved

3. **Not redeploying:**
   - Must redeploy after changing root directory
   - Old deployments still use old settings

---

## 🆘 Still Not Working?

1. **Verify the folder exists:**
   - Go to your GitHub repository
   - Check that `hrm-backend/package.json` exists
   - It should be there ✅

2. **Check the exact value:**
   - Go back to Settings → General → Root Directory
   - Make sure it says exactly: `hrm-backend`
   - No extra spaces or characters

3. **Try a fresh deployment:**
   - After setting root directory
   - Make a small change (add a comment to any file)
   - Commit and push to trigger new deployment
   - Or manually click "Redeploy"

---

## 📝 Summary

**The fix is simple:**
1. Vercel Dashboard → hrm-backend → Settings → General
2. Root Directory → Edit → Type: `hrm-backend` → Save
3. Deployments → Redeploy
4. Done! ✅

The code is correct - you just need to tell Vercel where to look for the files!

