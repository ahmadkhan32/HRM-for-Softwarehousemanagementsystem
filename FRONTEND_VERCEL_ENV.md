# Frontend Vercel Environment Variable Setup

## ✅ Environment Variable for Frontend

Since your **backend is working perfectly on Vercel**, you need to add this environment variable to your **frontend** Vercel project:

### Environment Variable Name:
```
VITE_API_URL
```

### Environment Variable Value:
```
https://your-backend-url.vercel.app/api
```

**Replace `your-backend-url` with your actual backend Vercel URL.**

For example, if your backend URL is:
- `https://hrm-backend-abc123.vercel.app`

Then set:
```
VITE_API_URL=https://hrm-backend-abc123.vercel.app/api
```

## 📝 Steps to Add in Vercel:

1. Go to your **Frontend Project** in Vercel Dashboard
2. Click on **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.vercel.app/api` (replace with your actual backend URL)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your frontend project (or it will auto-redeploy on next push)

## 🔍 How to Find Your Backend URL:

1. Go to your **Backend Project** in Vercel Dashboard
2. Look at the **Domains** section
3. Copy the URL (e.g., `https://hrm-backend-xxx.vercel.app`)
4. Add `/api` at the end for the environment variable value

## ⚠️ Important Notes:

- The value must include `/api` at the end
- Use `https://` (not `http://`)
- No trailing slash after `/api`
- After adding the variable, you must **redeploy** for it to take effect

## ✅ Backend Environment Variables (Already Set):

Your backend should have these environment variables (using ByteHost):

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
```

## 🧪 Test After Deployment:

1. Visit your frontend URL
2. Try to login
3. Open browser console (F12) and check Network tab
4. API calls should go to: `https://your-backend-url.vercel.app/api/...`

