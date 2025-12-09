import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiTrendingUp, FiStar, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ManagerPerformance = () => {
  const [performances, setPerformances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    review_period: '',
    rating: '',
    kpi_score: '',
    feedback: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [perfRes, empRes] = await Promise.all([
        api.get('/performance'),
        api.get('/employees')
      ]);
      setPerformances(perfRes.data.performances || []);
      setEmployees(empRes.data.employees || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/performance', formData);
      toast.success('Performance record created successfully!');
      setShowModal(false);
      setFormData({
        employee_id: '',
        review_period: '',
        rating: '',
        kpi_score: '',
        feedback: ''
      });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create performance record');
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Performance</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Goals Achieved</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performances.map((perf) => (
              <tr key={perf.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {perf.employee?.first_name} {perf.employee?.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {perf.review_period || perf.period || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < (perf.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{perf.rating}/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {perf.kpi_score || perf.goals_achieved || 0}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {perf.feedback || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Performance Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  value={formData.employee_id}
                  onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.first_name} {emp.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Period</label>
                <input
                  type="text"
                  value={formData.review_period}
                  onChange={(e) => setFormData({ ...formData, review_period: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Q1 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.kpi_score}
                  onChange={(e) => setFormData({ ...formData, kpi_score: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Add Performance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerPerformance;

