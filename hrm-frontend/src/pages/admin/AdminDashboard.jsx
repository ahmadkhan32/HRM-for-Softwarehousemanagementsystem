import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FiUsers, FiClock, FiCalendar, FiDollarSign, FiTrendingUp, FiBriefcase } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [employeesRes, attendanceRes, leavesRes, payrollRes] = await Promise.all([
        api.get('/employees'),
        api.get('/attendance?start_date=2024-01-01'),
        api.get('/leaves'),
        api.get('/payroll')
      ]);

      const stats = {
        totalEmployees: employeesRes.data.employees?.length || 0,
        totalAttendance: attendanceRes.data.attendance?.length || 0,
        pendingLeaves: leavesRes.data.leaves?.filter(l => l.status === 'pending').length || 0,
        totalPayrolls: payrollRes.data.payrolls?.length || 0,
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    { icon: FiUsers, label: 'Total Employees', value: stats?.totalEmployees || 0, color: 'bg-blue-500' },
    { icon: FiClock, label: 'Attendance Records', value: stats?.totalAttendance || 0, color: 'bg-green-500' },
    { icon: FiCalendar, label: 'Pending Leaves', value: stats?.pendingLeaves || 0, color: 'bg-yellow-500' },
    { icon: FiDollarSign, label: 'Payroll Records', value: stats?.totalPayrolls || 0, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to HRM System - Manage your workforce efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const getNavigationPath = () => {
            switch(stat.label) {
              case 'Total Employees': return '/admin/employees';
              case 'Attendance Records': return '/admin/attendance';
              case 'Pending Leaves': return '/admin/leaves';
              case 'Payroll Records': return '/admin/payroll';
              default: return '/admin/dashboard';
            }
          };
          return (
            <div 
              key={index} 
              onClick={() => navigate(getNavigationPath())}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to="/admin/employees" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiUsers className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Employees</p>
          </Link>
          <Link to="/admin/attendance" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiClock className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Attendance</p>
          </Link>
          <Link to="/admin/leaves" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiCalendar className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Leaves</p>
          </Link>
          <Link to="/admin/payroll" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiDollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Payroll</p>
          </Link>
          <Link to="/admin/performance" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Performance</p>
          </Link>
          <Link to="/admin/recruitment" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiBriefcase className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Recruitment</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

