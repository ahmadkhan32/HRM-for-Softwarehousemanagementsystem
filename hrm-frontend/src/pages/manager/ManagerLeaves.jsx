import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ManagerLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leaves');
      setLeaves(res.data.leaves || []);
    } catch (error) {
      toast.error('Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/leaves/${id}/status`, { status: 'approved' });
      toast.success('Leave approved');
      fetchLeaves();
    } catch (error) {
      toast.error('Failed to approve leave');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/leaves/${id}/status`, { status: 'rejected' });
      toast.success('Leave rejected');
      fetchLeaves();
    } catch (error) {
      toast.error('Failed to reject leave');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Leave Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.employee?.first_name} {leave.employee?.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {leave.leave_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(leave.start_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(leave.end_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {leave.days || 0}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {leave.reason || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                    leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {leave.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(leave.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiCheck className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(leave.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerLeaves;

