import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiTrendingUp, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EmployeePerformance = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const res = await api.get('/performance');
      setPerformances(res.data.performances || []);
    } catch (error) {
      toast.error('Failed to fetch performance records');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Performance</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
        {performances.length === 0 && (
          <div className="text-center py-12">
            <FiTrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No performance records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePerformance;

