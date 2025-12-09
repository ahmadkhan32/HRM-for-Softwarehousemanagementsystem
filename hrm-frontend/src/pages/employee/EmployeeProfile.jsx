import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiEdit, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const [userRes, employeeRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/employees/me').catch(() => ({ data: { employee: null } }))
      ]);
      setProfile(userRes.data.user);
      const employee = employeeRes.data.employee || userRes.data.user.employee;
      setFormData({
        email: userRes.data.user.email || '',
        phone: employee?.phone || '',
        address: employee?.address || ''
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/employees/me', formData);
      toast.success('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
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
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            <FiEdit className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
            <FiUser className="w-12 h-12 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profile?.employee?.first_name} {profile?.employee?.last_name}
            </h2>
            <p className="text-gray-500">{profile?.employee?.position}</p>
            <p className="text-sm text-gray-400">{profile?.employee?.employee_id}</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FiX className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <FiSave className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{profile?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{profile?.employee?.phone || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <p className="text-gray-900">{profile?.employee?.department || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <p className="text-gray-900">{profile?.employee?.position || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                <p className="text-gray-900">
                  {profile?.employee?.joining_date ? new Date(profile.employee.joining_date).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <p className="text-gray-900">
                  ${profile?.employee?.salary?.toLocaleString() || '-'}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <p className="text-gray-900">{profile?.employee?.address || '-'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;

