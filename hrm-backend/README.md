# HRM System - Backend

Human Resource Management System Backend built with Node.js, Express, and MySQL.

## Features

- Employee Management
- Attendance Tracking
- Leave Management
- Payroll Processing
- Performance Evaluation
- Recruitment Management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hrm_db
DB_PORT=3306
PORT=5000
JWT_SECRET=your_secret_key
```

3. Start MySQL server (XAMPP)

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee (admin only)
- `PUT /api/employees/:id` - Update employee (admin only)
- `DELETE /api/employees/:id` - Delete employee (admin only)

### Attendance
- `POST /api/attendance/checkin` - Check in
- `POST /api/attendance/checkout` - Check out
- `GET /api/attendance` - Get attendance records

### Leaves
- `POST /api/leaves` - Create leave request
- `GET /api/leaves` - Get leave requests
- `PUT /api/leaves/:id/status` - Approve/Reject leave

## Roles

- **admin**: Full access
- **manager**: Can view and approve leaves
- **employee**: Can check in/out and request leaves

