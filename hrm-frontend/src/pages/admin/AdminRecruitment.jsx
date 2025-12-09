import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiBriefcase, FiPlus, FiUsers, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminRecruitment = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    job_title: '',
    position: '',
    department: '',
    description: '',
    requirements: '',
    salary_range: '',
    status: 'open'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, applicantsRes] = await Promise.all([
        api.get('/recruitment'),
        api.get('/recruitment/applicants')
      ]);
      setRecruitments(jobsRes.data.jobs || jobsRes.data.recruitments || []);
      setApplicants(applicantsRes.data.applicants || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await api.post('/recruitment', formData);
      toast.success('Job posted successfully!');
      setShowModal(false);
      setFormData({
        job_title: '',
        position: '',
        department: '',
        description: '',
        requirements: '',
        salary_range: '',
        status: 'open'
      });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
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
        <h1 className="text-3xl font-bold text-gray-900">Recruitment</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Post Job</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiBriefcase className="inline w-5 h-5 mr-2" />
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('applicants')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applicants'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiUsers className="inline w-5 h-5 mr-2" />
              Applicants
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recruitments.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {job.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.applications_count || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'applicants' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applicant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicant.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicant.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      applicant.status === 'hired' ? 'bg-green-100 text-green-800' :
                      applicant.status === 'interviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Post New Job</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  value={formData.salary_range}
                  onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
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
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRecruitment;

