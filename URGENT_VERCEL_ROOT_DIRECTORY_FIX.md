# 🚨 URGENT: Fix Backend Deployment - Root Directory

## ❌ Current Error
```
npm error enoent Could not read package.json
npm error path /vercel/path0/package.json
```

## ✅ SOLUTION - Do This NOW in Vercel Dashboard

### Step-by-Step Instructions:

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Login if needed

2. **Open Your Backend Project:**
   - Click on **"hrm-backend"** project
   - (It's under "Ahmad's projects")

3. **Go to Settings:**
   - Click **"Settings"** button (top right, gear icon)
   - Or click **"Settings"** in the left sidebar

4. **Find Root Directory:**
   - Click **"General"** tab (left sidebar)
   - Scroll down to find **"Root Directory"** section
   - You'll see it says something like "Leave empty to use repository root"

5. **Set Root Directory:**
   - Click **"Edit"** button next to Root Directory
   - **Clear** any existing value
   - Type exactly: `hrm-backend`
   - **DO NOT** include:
     - No leading slash: `/hrm-backend` ❌
     - No trailing slash: `hrm-backend/` ❌
     - No dot: `./hrm-backend` ❌
   - Just: `hrm-backend` ✅
   - Click **"Save"**

6. **Redeploy:**
   - Go to **"Deployments"** tab
   - Find the latest failed deployment
   - Click **"⋯"** (three dots menu)
   - Click **"Redeploy"**
   - Or click the **"Redeploy"** button at the top

7. **Wait for Build:**
   - Watch the build logs
   - It should now find `package.json`
   - Build should succeed

## 📸 Visual Guide

```
Vercel Dashboard
  └─ hrm-backend (click this)
      └─ Settings (click this)
          └─ General (click this)
              └─ Root Directory (scroll down)
                  └─ Edit (click this)
                      └─ Type: hrm-backend
                          └─ Save
                              └─ Go to Deployments
                                  └─ Redeploy
```

## ✅ What Should Happen

After setting root directory and redeploying:

1. ✅ Build logs will show: "Installing dependencies..."
2. ✅ It will find `package.json` in `hrm-backend/` folder
3. ✅ `npm install` will run successfully
4. ✅ Build will complete
5. ✅ Backend will be live at: `https://hrm-backend-xxx.vercel.app`

## ⚠️ Important Notes

- **Root Directory** is a Vercel Dashboard setting, NOT in code
- You MUST set it in Vercel Dashboard
- After setting, you MUST redeploy
- This is a one-time configuration

## 🐛 If Still Not Working

1. **Double-check the value:**
   - Should be exactly: `hrm-backend`
   - No spaces before or after
   - Case-sensitive (lowercase)

2. **Check Build Logs:**
   - Go to Deployments → Click on deployment → View Logs
   - Look for where it's trying to find package.json
   - Should now show: `Installing dependencies from hrm-backend/package.json`

3. **Try Manual Deploy:**
   - Settings → General → Root Directory → Set to `hrm-backend`
   - Save
   - Deployments → Click "Redeploy" button

## 🎯 Quick Checklist

- [ ] Opened Vercel Dashboard
- [ ] Clicked on "hrm-backend" project
- [ ] Went to Settings → General
- [ ] Found "Root Directory" section
- [ ] Clicked "Edit"
- [ ] Typed: `hrm-backend` (exactly this)
- [ ] Clicked "Save"
- [ ] Went to Deployments tab
- [ ] Clicked "Redeploy"
- [ ] Waited for build to complete
- [ ] Checked that build succeeded

## 📞 Still Need Help?

If after following these steps it still doesn't work:

1. **Screenshot the Settings page** showing Root Directory
2. **Screenshot the Build Logs** showing the error
3. **Verify** the folder structure in GitHub:
   - Should have: `hrm-backend/package.json`
   - Should exist in the repository

The code is correct - this is purely a Vercel Dashboard configuration issue!

