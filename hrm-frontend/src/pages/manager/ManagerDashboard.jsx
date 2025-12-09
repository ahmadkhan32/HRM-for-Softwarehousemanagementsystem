import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FiUsers, FiClock, FiCalendar, FiTrendingUp } from 'react-icons/fi';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [employeesRes, attendanceRes, leavesRes] = await Promise.all([
        api.get('/employees'),
        api.get('/attendance'),
        api.get('/leaves?status=pending')
      ]);

      setStats({
        totalEmployees: employeesRes.data.employees?.length || 0,
        totalAttendance: attendanceRes.data.attendance?.length || 0,
        pendingLeaves: leavesRes.data.leaves?.length || 0,
      });
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
        <p className="text-gray-600">Manage your team's performance and track their progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          onClick={() => navigate('/manager/employees')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalEmployees || 0}</p>
            </div>
            <div className="bg-blue-500 p-4 rounded-full">
              <FiUsers className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/manager/attendance')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Attendance Records</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalAttendance || 0}</p>
            </div>
            <div className="bg-green-500 p-4 rounded-full">
              <FiClock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/manager/leaves')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Leaves</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.pendingLeaves || 0}</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-full">
              <FiCalendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/manager/employees" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiUsers className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Employees</p>
          </Link>
          <Link to="/manager/attendance" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiClock className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Attendance</p>
          </Link>
          <Link to="/manager/leaves" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiCalendar className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Leaves</p>
          </Link>
          <Link to="/manager/performance" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Performance</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

