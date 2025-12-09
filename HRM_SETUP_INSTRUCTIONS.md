# HRM System - Complete Setup Instructions

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MySQL (via XAMPP)
- npm or yarn

### Step 1: Database Setup

1. Start XAMPP and start MySQL service
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database named `hrm_db`

### Step 2: Backend Setup

```bash
cd hrm-backend
npm install
```

3. Create `.env` file in `hrm-backend` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hrm_db
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Start backend server:
```bash
npm run dev
```

The server will automatically create all database tables on first run.

### Step 3: Frontend Setup (Coming Next)

The frontend will be created in the next step.

## 📁 Project Structure

```
hrm-backend/
├── config/          # Database and auth configuration
├── controllers/     # Business logic
├── models/          # Database models
├── routes/          # API routes
├── middlewares/     # Authentication & authorization
├── uploads/         # File uploads
└── server.js        # Entry point
```

## 🔑 Default Login Credentials

After seeding (coming soon):
- Admin: admin@hrm.com / admin123
- Employee: employee@hrm.com / employee123

## 📝 Next Steps

1. Complete remaining controllers (Payroll, Performance, Recruitment)
2. Create seed data script
3. Set up React frontend
4. Test all modules

