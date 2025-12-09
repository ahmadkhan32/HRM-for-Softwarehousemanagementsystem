import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEmployees from './pages/admin/AdminEmployees';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminLeaves from './pages/admin/AdminLeaves';
import AdminPayroll from './pages/admin/AdminPayroll';
import AdminPerformance from './pages/admin/AdminPerformance';
import AdminRecruitment from './pages/admin/AdminRecruitment';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerEmployees from './pages/manager/ManagerEmployees';
import ManagerAttendance from './pages/manager/ManagerAttendance';
import ManagerLeaves from './pages/manager/ManagerLeaves';
import ManagerPerformance from './pages/manager/ManagerPerformance';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeeLeaves from './pages/employee/EmployeeLeaves';
import EmployeePayroll from './pages/employee/EmployeePayroll';
import EmployeePerformance from './pages/employee/EmployeePerformance';
import EmployeeProfile from './pages/employee/EmployeeProfile';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        {children}
      </main>
    </div>
  );
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getDefaultRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'manager':
        return '/manager/dashboard';
      case 'employee':
        return '/employee/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={getDefaultRoute()} />}
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminDashboard /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminEmployees /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminAttendance /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/leaves"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminLeaves /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/payroll"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminPayroll /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/performance"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminPerformance /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/recruitment"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><AdminRecruitment /></Layout>
          </PrivateRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path="/manager/dashboard"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Layout><ManagerDashboard /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/employees"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Layout><ManagerEmployees /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/attendance"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Layout><ManagerAttendance /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/leaves"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Layout><ManagerLeaves /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/performance"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Layout><ManagerPerformance /></Layout>
          </PrivateRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employee/dashboard"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout><EmployeeDashboard /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/attendance"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout><EmployeeAttendance /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/leaves"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout><EmployeeLeaves /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/payroll"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout><EmployeePayroll /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/performance"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout><EmployeePerformance /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/profile"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout><EmployeeProfile /></Layout>
          </PrivateRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} />} />
      <Route path="*" element={<Navigate to={getDefaultRoute()} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
        <ToastContainer position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;

