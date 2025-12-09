# Internship Task & Time Management System (ITMS)

A complete MERN stack application for managing internships, tasks, attendance, and time tracking in a software house environment.

## Features

- **Multi-Role Access**: Admin, Manager, Supervisor, Employee, and Intern roles
- **Automated Time Tracking**: Check-in/check-out with time validation
- **Task Management**: Assign, submit, and approve tasks
- **Attendance Tracking**: Daily attendance records with hour calculation
- **Progress Tracking**: Real-time dashboards and analytics
- **Notifications**: In-app notifications for task assignments and updates
- **File Uploads**: Profile images and task submission files

## Tech Stack

- **Backend**: Node.js, Express.js, Sequelize ORM, MySQL (XAMPP)
- **Frontend**: React.js, React Router, TailwindCSS, Recharts
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local file system (multer)

## Prerequisites

- Node.js (v14 or higher)
- XAMPP (for MySQL database)
- npm or yarn

## Installation

### 1. Database Setup

1. Start XAMPP and ensure MySQL is running
2. Create a new database named `internship_management` in phpMyAdmin
3. The database tables will be created automatically when you start the backend server

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DB_NAME=internship_management
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middlewares/          # Auth and role middlewares
│   ├── models/               # Sequelize models
│   ├── routes/               # API routes
│   ├── uploads/              # File uploads directory
│   ├── utils/                # Utility functions
│   └── server.js             # Express server
│
├── frontend/
│   ├── src/
│   │   ├── api/              # API configuration
│   │   ├── components/       # React components
│   │   ├── context/          # React context (Auth)
│   │   ├── pages/            # Page components
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task (Supervisor/Admin)
- `POST /api/tasks/submit` - Submit task (Intern)
- `POST /api/tasks/approve` - Approve/Reject task (Supervisor/Admin)

### Attendance
- `POST /api/attendance/check-in` - Check in (Intern)
- `POST /api/attendance/check-out` - Check out (Intern)
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/today` - Get today's status

### Reports
- `GET /api/reports/attendance` - Attendance report
- `GET /api/reports/tasks` - Task performance report
- `GET /api/reports/interns/:intern_id/performance` - Intern performance

## Default Roles & Access

- **Admin**: Full system access, user management, departments
- **Manager**: Overview of supervisors and reports
- **Supervisor**: Manage assigned interns, assign tasks, review submissions
- **Employee**: Attendance reports and verification
- **Intern**: Check-in/out, view tasks, submit work, track progress

## Time Validation

Interns can only check-in and check-out during their assigned internship hours (e.g., 9:00 AM - 5:00 PM). The system automatically validates and rejects attempts outside this timeframe.

## File Uploads

- Profile images: Stored in `backend/uploads/`
- Task submissions: Stored in `backend/uploads/tasks/`
- Supported formats: Images (JPG, PNG, GIF) for profiles; PDF, DOC, DOCX, ZIP, RAR for tasks

## Development Notes

- The database uses Sequelize with `alter: true` for automatic schema updates
- JWT tokens expire after 7 days
- File uploads are limited to 5MB for profile images and 10MB for task files
- All routes are protected with authentication middleware
- Role-based access control is enforced on all endpoints

## Troubleshooting

1. **Database Connection Error**: Ensure XAMPP MySQL is running and credentials in `.env` are correct
2. **Port Already in Use**: Change the PORT in `.env` file
3. **CORS Errors**: Check that backend CORS is configured correctly
4. **File Upload Errors**: Ensure `uploads/` directory exists and has write permissions

## License

This project is for educational purposes.

## Support

For issues or questions, please check the code comments or create an issue in the repository.

