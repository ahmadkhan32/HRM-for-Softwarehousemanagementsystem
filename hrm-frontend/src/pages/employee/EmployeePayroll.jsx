import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiDollarSign, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EmployeePayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await api.get('/payroll');
      setPayrolls(res.data.payrolls || []);
    } catch (error) {
      toast.error('Failed to fetch payroll records');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Payroll</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowances</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonuses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payroll.month}/{payroll.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payroll.base_salary?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payroll.allowances?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payroll.bonuses?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payroll.deductions?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ${payroll.net_salary?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    payroll.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payroll.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payrolls.length === 0 && (
          <div className="text-center py-12">
            <FiDollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No payroll records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePayroll;

