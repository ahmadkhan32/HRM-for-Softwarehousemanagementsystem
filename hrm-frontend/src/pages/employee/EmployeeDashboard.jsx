import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { FiClock, FiCalendar, FiDollarSign, FiTrendingUp, FiUser } from 'react-icons/fi';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
      const endDate = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];

      const [attendanceRes, leavesRes, payrollRes] = await Promise.all([
        api.get(`/attendance?start_date=${startDate}&end_date=${endDate}`),
        api.get('/leaves'),
        api.get('/payroll')
      ]);

      const attendance = attendanceRes.data.attendance || [];
      const leaves = leavesRes.data.leaves || [];
      const payrolls = payrollRes.data.payrolls || [];

      setStats({
        attendanceCount: attendance.length,
        pendingLeaves: leaves.filter(l => l.status === 'pending').length,
        latestPayroll: payrolls.sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return b.month - a.month;
        })[0],
        recentAttendance: attendance.slice(0, 5),
        recentLeaves: leaves.slice(0, 5)
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.employee?.first_name || user?.email?.split('@')[0]} {user?.employee?.last_name || ''}
        </h1>
        <p className="text-gray-600">Employee Dashboard - Track your work and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          onClick={() => navigate('/employee/attendance')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">This Month Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.attendanceCount || 0}</p>
            </div>
            <div className="bg-blue-500 p-4 rounded-full">
              <FiClock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/employee/leaves')}
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

        <div 
          onClick={() => navigate('/employee/payroll')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Latest Payroll</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${stats?.latestPayroll?.net_salary?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="bg-green-500 p-4 rounded-full">
              <FiDollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link to="/employee/attendance" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiClock className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Attendance</p>
          </Link>
          <Link to="/employee/leaves" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiCalendar className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Leaves</p>
          </Link>
          <Link to="/employee/payroll" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiDollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Payroll</p>
          </Link>
          <Link to="/employee/performance" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Performance</p>
          </Link>
          <Link to="/employee/profile" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center">
            <FiUser className="w-8 h-8 mx-auto mb-2 text-gray-400 hover:text-primary-600" />
            <p className="text-sm font-medium text-gray-700">Profile</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Attendance</h2>
          <div className="space-y-3">
            {stats?.recentAttendance?.map((att) => (
              <div key={att.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{new Date(att.date).toLocaleDateString()}</span>
                <span className={`px-2 py-1 text-xs rounded ${att.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {att.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Leaves</h2>
          <div className="space-y-3">
            {stats?.recentLeaves?.map((leave) => (
              <div key={leave.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="text-sm text-gray-700">{leave.leave_type}</span>
                  <p className="text-xs text-gray-500">{new Date(leave.start_date).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                  leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

