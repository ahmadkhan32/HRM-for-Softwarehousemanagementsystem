import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [todayStatus, setTodayStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
    checkTodayStatus();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await api.get('/attendance');
      setAttendance(res.data.attendance || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkTodayStatus = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await api.get(`/attendance?start_date=${today}&end_date=${today}`);
      const todayRecord = res.data.attendance?.[0];
      setTodayStatus(todayRecord);
    } catch (error) {
      console.error('Error checking today status:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      await api.post('/attendance/checkin');
      toast.success('Checked in successfully!');
      checkTodayStatus();
      fetchAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      await api.post('/attendance/checkout');
      toast.success('Checked out successfully!');
      checkTodayStatus();
      fetchAttendance();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-out failed');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Attendance</h2>
        <div className="flex items-center justify-center space-x-4">
          {!todayStatus?.check_in ? (
            <button
              onClick={handleCheckIn}
              className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <FiCheckCircle className="w-5 h-5" />
              <span>Check In</span>
            </button>
          ) : !todayStatus?.check_out ? (
            <button
              onClick={handleCheckOut}
              className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              <FiXCircle className="w-5 h-5" />
              <span>Check Out</span>
            </button>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">Already checked out for today</p>
              <p className="text-sm text-gray-500 mt-2">
                Hours worked: {todayStatus.hours_worked || 0}
              </p>
            </div>
          )}
        </div>
        {todayStatus?.check_in && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Check In: {new Date(todayStatus.check_in).toLocaleTimeString()}</p>
            {todayStatus.check_out && (
              <p>Check Out: {new Date(todayStatus.check_out).toLocaleTimeString()}</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-bold text-gray-900 p-6 border-b">Attendance History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.check_in ? new Date(record.check_in).toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.check_out ? new Date(record.check_out).toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.hours_worked || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;

