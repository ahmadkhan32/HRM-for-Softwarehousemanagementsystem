# HRM System - Backend Setup Guide

## Project Structure
```
hrm-backend/
├── config/
│   ├── db.js
│   └── auth.js
├── controllers/
│   ├── employeeController.js
│   ├── payrollController.js
│   ├── attendanceController.js
│   ├── leaveController.js
│   ├── performanceController.js
│   ├── recruitmentController.js
│   └── authController.js
├── models/
│   ├── Employee.js
│   ├── Payroll.js
│   ├── Attendance.js
│   ├── Leave.js
│   ├── Performance.js
│   ├── Recruitment.js
│   └── User.js
├── routes/
│   ├── employeeRoutes.js
│   ├── payrollRoutes.js
│   ├── attendanceRoutes.js
│   ├── leaveRoutes.js
│   ├── performanceRoutes.js
│   ├── recruitmentRoutes.js
│   └── authRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── utils/
│   └── helpers.js
├── uploads/
├── server.js
└── package.json
```

## Installation Steps

1. Navigate to backend directory
2. Run: `npm install`
3. Create `.env` file with database credentials
4. Run: `npm run dev` to start server

