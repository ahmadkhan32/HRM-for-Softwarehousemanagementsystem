# HRM System - Frontend

React frontend for Human Resource Management System built with Vite.

## Features

- ✅ React 18 with Vite
- ✅ React Router for navigation
- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ Tailwind CSS for styling
- ✅ Axios for API calls
- ✅ Toast notifications

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Build

```bash
npm run build
```

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── api/              # API configuration
├── components/       # Reusable components
├── context/          # React Context (Auth)
├── pages/            # Page components
│   ├── admin/        # Admin pages
│   ├── manager/      # Manager pages
│   └── employee/     # Employee pages
└── App.jsx           # Main app component
```

## Features Implemented

- Login page with authentication
- Role-based routing
- Admin dashboard
- Employee dashboard
- Attendance tracking (check-in/check-out)
- Sidebar navigation
- Protected routes

## Next Steps

- Complete all admin pages (Employees, Leaves, Payroll, etc.)
- Complete manager pages
- Complete employee pages (Leaves, Payroll, Performance, Profile)
- Add forms for creating/editing records
- Add data tables with pagination
- Add charts and analytics

