# 🔧 Fix: Vercel Root Directory Configuration

## ❌ Error
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

## ✅ Solution

Vercel needs to know that your backend project is in the `hrm-backend/` subdirectory.

### Option 1: Set Root Directory in Vercel (RECOMMENDED)

1. Go to **Vercel Dashboard**
2. Select your **Backend Project** (`hrm-frontend-lac`)
3. Go to **Settings** → **General**
4. Scroll down to **Root Directory**
5. Set it to: `hrm-backend`
6. Click **Save**
7. **Redeploy** the project

### Option 2: Use Vercel CLI (Alternative)

If you're using Vercel CLI, you can specify the root directory:

```bash
vercel --cwd hrm-backend
```

### Option 3: Deploy from Subdirectory

In Vercel Dashboard:
1. **Import Project** again
2. When asked for **Root Directory**, select: `hrm-backend`
3. This will make Vercel look in the correct folder

## 📋 After Setting Root Directory

Once the root directory is set to `hrm-backend`, Vercel will:
- ✅ Find `package.json` in the correct location
- ✅ Run `npm install` in the right directory
- ✅ Build and deploy correctly

## 🔍 Verify Configuration

After setting the root directory, check:
1. **Build Logs** should show:
   ```
   Installing dependencies...
   npm install
   ```
   And it should find `package.json`

2. **Deployment** should succeed without the ENOENT error

## ⚠️ Important Notes

- **Root Directory** must be set to `hrm-backend` for the backend project
- **Root Directory** must be set to `hrm-frontend` for the frontend project
- Each Vercel project needs its own root directory setting
- This is a **one-time configuration** in Vercel Dashboard

## 🎯 Quick Steps

1. **Backend Project:**
   - Settings → General → Root Directory → `hrm-backend` → Save → Redeploy

2. **Frontend Project:**
   - Settings → General → Root Directory → `hrm-frontend` → Save → Redeploy

This will fix the `package.json not found` error!

