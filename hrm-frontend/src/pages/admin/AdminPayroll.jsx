import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiDollarSign, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminPayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    allowances: '',
    bonuses: '',
    overtime: '',
    deductions: ''
  });

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await api.get('/payroll');
      setPayrolls(res.data.payrolls || []);
    } catch (error) {
      toast.error('Failed to fetch payrolls');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data.employees || []);
    } catch (error) {
      console.error('Failed to fetch employees');
    }
  };

  const handleGeneratePayroll = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payroll', formData);
      toast.success('Payroll generated successfully!');
      setShowModal(false);
      setFormData({
        employee_id: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        allowances: '',
        bonuses: '',
        overtime: '',
        deductions: ''
      });
      fetchPayrolls();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate payroll');
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
        <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Generate Payroll</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowances</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payroll.employee?.first_name} {payroll.employee?.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payroll.month}/{payroll.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payroll.base_salary?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${payroll.allowances?.toLocaleString() || 0}
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
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Generate Payroll</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleGeneratePayroll} className="space-y-4">
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
                      {emp.first_name} {emp.last_name} ({emp.employee_id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    min="2020"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowances ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.allowances}
                  onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonuses ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.bonuses}
                  onChange={(e) => setFormData({ ...formData, bonuses: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overtime ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.overtime}
                  onChange={(e) => setFormData({ ...formData, overtime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deductions ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.deductions}
                  onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0.00"
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
                  Generate Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayroll;

