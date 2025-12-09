# 🚀 How to Start HRM System

## Option 1: Using PowerShell Script (Recommended)

Run this command in PowerShell from the project root:

```powershell
.\start-all.ps1
```

This will open two separate terminal windows:
- One for the backend (port 5000)
- One for the frontend (port 3000)

## Option 2: Using Batch Files

Double-click or run:
- `start-backend.bat` - Starts backend server
- `start-frontend.bat` - Starts frontend server

## Option 3: Manual Start (Two Terminals)

### Terminal 1 - Backend:
```bash
cd hrm-backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd hrm-frontend
npm run dev
```

## 📍 URLs

- **Backend API:** http://localhost:5000
- **Frontend App:** http://localhost:3000

## ⚠️ Important

1. Make sure MySQL (XAMPP) is running
2. Run `npm run seed` in `hrm-backend` directory first to set up the database
3. Both servers must be running simultaneously

## 🔑 Login Credentials

- **Admin:** admin@hrm.com / admin123
- **Manager:** manager@hrm.com / manager123
- **Employee:** employee1@hrm.com / employee123

