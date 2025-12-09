import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ManagerAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendance();
  }, [startDate, endDate]);

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/attendance?start_date=${startDate}&end_date=${endDate}`);
      setAttendance(res.data.attendance || []);
    } catch (error) {
      toast.error('Failed to fetch attendance');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance Records</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchAttendance}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.employee?.first_name} {record.employee?.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.check_in ? new Date(record.check_in).toLocaleTimeString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.check_out ? new Date(record.check_out).toLocaleTimeString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.hours_worked || 0} hrs
                </td>
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
  );
};

export default ManagerAttendance;

