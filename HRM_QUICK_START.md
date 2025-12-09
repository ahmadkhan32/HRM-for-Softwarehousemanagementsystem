# HRM System - Quick Start Guide

## 🚀 Running the Project

### Prerequisites
- Node.js (v14 or higher)
- MySQL (XAMPP)
- npm or yarn

### Step 1: Database Setup

1. Start XAMPP and ensure MySQL is running
2. Create a database named `hrm_db` in phpMyAdmin:
   ```sql
   CREATE DATABASE hrm_db;
   ```

### Step 2: Backend Setup

1. Navigate to backend directory:
   ```bash
   cd hrm-backend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Create `.env` file (if not exists):
   ```env
   DB_NAME=hrm_db
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   DB_PORT=3306
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ```

4. Run database seed (to create tables and initial data):
   ```bash
   npm run seed
   ```

5. Start backend server:
   ```bash
   npm run dev
   ```
   Backend will run on: `http://localhost:5000`

### Step 3: Frontend Setup

1. Navigate to frontend directory (in a new terminal):
   ```bash
   cd hrm-frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Create `.env` file (optional):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start frontend server:
   ```bash
   npm run dev
   ```
   Frontend will run on: `http://localhost:3000`

## 🔑 Default Login Credentials

After running the seed script, you can login with:

- **Admin:**
  - Email: `admin@hrm.com`
  - Password: `admin123`

- **Manager:**
  - Email: `manager@hrm.com`
  - Password: `manager123`

- **Employee:**
  - Email: `employee1@hrm.com`
  - Password: `employee123`

## 📁 Project Structure

```
hrm-system/
├── hrm-backend/          # Node.js + Express backend
│   ├── config/           # Database & auth config
│   ├── controllers/      # Route controllers
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── middlewares/      # Auth & role middleware
│   └── seeders/          # Database seed script
│
└── hrm-frontend/         # React + Vite frontend
    ├── src/
    │   ├── api/          # API configuration
    │   ├── components/   # React components
    │   ├── context/      # React Context (Auth)
    │   └── pages/        # Page components
    └── public/
```

## 🛠️ Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with initial data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Endpoints

Base URL: `http://localhost:5000/api`

- **Auth:** `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
- **Employees:** `/api/employees`
- **Attendance:** `/api/attendance`
- **Leaves:** `/api/leaves`
- **Payroll:** `/api/payroll`
- **Performance:** `/api/performance`
- **Recruitment:** `/api/recruitment`

## ⚠️ Troubleshooting

1. **Port already in use:**
   - Change PORT in `.env` file
   - Or kill the process using the port

2. **Database connection error:**
   - Ensure MySQL is running in XAMPP
   - Check database credentials in `.env`

3. **Module not found:**
   - Run `npm install` in both directories

4. **CORS errors:**
   - Ensure backend is running on port 5000
   - Check frontend API URL in `src/api/axios.js`

## 📝 Notes

- Backend runs on port **5000**
- Frontend runs on port **3000**
- Make sure both servers are running simultaneously
- Database tables are created automatically on first run

