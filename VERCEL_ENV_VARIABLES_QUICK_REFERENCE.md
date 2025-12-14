# 🚀 Vercel Environment Variables - Quick Reference

## ⚠️ IMPORTANT CLARIFICATION

**VITE_API_URL is ONLY for FRONTEND, not backend!**

- ❌ **Wrong:** Backend doesn't need VITE_API_URL
- ✅ **Correct:** Frontend needs VITE_API_URL pointing to backend API

---

## 📋 Backend Project (`hrm-frontend-lac.vercel.app`)

**Location:** Vercel Dashboard → Backend Project → Settings → Environment Variables

### Add These 11 Variables:

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

**Note:** Backend does NOT need VITE_API_URL!

---

## 📋 Frontend Project (`hrm-frontendd.vercel.app`)

**Location:** Vercel Dashboard → Frontend Project → Settings → Environment Variables

### Add This 1 Variable:

```
VITE_API_URL=https://hrm-frontend-lac.vercel.app/api
```

**Important:** 
- Must include `/api` at the end
- This tells frontend where to send API requests

---

## 🎯 URLs Summary

| Project | URL | Purpose |
|---------|-----|---------|
| **Backend** | `https://hrm-frontend-lac.vercel.app` | API Server |
| **Frontend** | `https://hrm-frontendd.vercel.app` | Web App |

**Frontend connects to:** `https://hrm-frontend-lac.vercel.app/api`

---

## ✅ Quick Setup Steps

1. **Set Root Directory:**
   - Backend: `hrm-backend`
   - Frontend: `hrm-frontend`

2. **Add Environment Variables:**
   - Backend: 11 variables (see above)
   - Frontend: 1 variable (VITE_API_URL)

3. **Redeploy Both Projects**

4. **Test:**
   - Backend: `https://hrm-frontend-lac.vercel.app`
   - Frontend: `https://hrm-frontendd.vercel.app`

---

## 🔐 Login Credentials

- **Admin:** `admin@hrm.com` / `admin123`
- **Manager:** `manager@hrm.com` / `manager123`
- **Employee:** `employee1@hrm.com` / `employee123`

---

## 🐛 Fix package.json Error

**Root Directory MUST be set:**
- Backend Project → Settings → General → Root Directory → `hrm-backend`
- Frontend Project → Settings → General → Root Directory → `hrm-frontend`

Then **Redeploy**!

