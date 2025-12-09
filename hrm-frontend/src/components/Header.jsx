import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser } from 'react-icons/fi';

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">HRM System</h2>
          <p className="text-sm text-gray-500">Human Resource Management</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <FiUser className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

