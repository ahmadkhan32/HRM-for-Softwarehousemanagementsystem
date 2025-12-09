import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiUsers,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiBriefcase,
  FiLogOut,
  FiUser
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100';
  };

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/admin/employees', label: 'Employees', icon: FiUsers },
    { path: '/admin/attendance', label: 'Attendance', icon: FiClock },
    { path: '/admin/leaves', label: 'Leaves', icon: FiCalendar },
    { path: '/admin/payroll', label: 'Payroll', icon: FiDollarSign },
    { path: '/admin/performance', label: 'Performance', icon: FiTrendingUp },
    { path: '/admin/recruitment', label: 'Recruitment', icon: FiBriefcase },
  ];

  const managerMenuItems = [
    { path: '/manager/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/manager/employees', label: 'Employees', icon: FiUsers },
    { path: '/manager/attendance', label: 'Attendance', icon: FiClock },
    { path: '/manager/leaves', label: 'Leaves', icon: FiCalendar },
    { path: '/manager/performance', label: 'Performance', icon: FiTrendingUp },
  ];

  const employeeMenuItems = [
    { path: '/employee/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/employee/attendance', label: 'Attendance', icon: FiClock },
    { path: '/employee/leaves', label: 'My Leaves', icon: FiCalendar },
    { path: '/employee/payroll', label: 'Payroll', icon: FiDollarSign },
    { path: '/employee/performance', label: 'Performance', icon: FiTrendingUp },
    { path: '/employee/profile', label: 'Profile', icon: FiUser },
  ];

  const getMenuItems = () => {
    if (user?.role === 'admin') return adminMenuItems;
    if (user?.role === 'manager') return managerMenuItems;
    return employeeMenuItems;
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-600">HRM System</h1>
        <p className="text-sm text-gray-500 mt-1">{user?.role?.toUpperCase()}</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {getMenuItems().map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${isActive(item.path)}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

