import React, { useEffect, useState } from 'react';
import { userService, UserProfile, UserListResponse } from '@/services/user/user.service';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageIndex: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (pageIndex: number = 1) => {
    try {
      setLoading(true);
      const response: UserListResponse = await userService.getUserList(pageIndex, pagination.pageSize);
      
      setUsers(response.data.items);
      setPagination({
        totalCount: response.data.totalCount,
        pageIndex: response.data.pageIndex,
        pageSize: response.data.pageSize,
        hasNextPage: response.data.hasNextPage,
        hasPreviousPage: response.data.hasPreviousPage
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPageIndex: number) => {
    fetchUsers(newPageIndex);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-lg text-gray-600">Loading users...</span>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>;
  }

  return (
    <div className="user-list max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>
      <p className="text-gray-600 mb-8">Total users: {pagination.totalCount}</p>
      
      <div className="users-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {users.map((user) => (
          <div key={user.id} className="user-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="user-avatar flex-shrink-0 mr-4">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.nickName} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="default-avatar w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      {user.nickName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="user-info">
                  <h3 className="text-xl font-semibold text-gray-800">{user.nickName}</h3>
                  <p className="text-gray-600">ID: {user.id}</p>
                </div>
              </div>
              <div className="user-details space-y-2">
                <p className="text-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  {user.email || 'N/A'}
                </p>
                <p className="text-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  {user.phoneNumber || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination flex justify-between items-center mt-8">
        <button 
          onClick={() => handlePageChange(pagination.pageIndex - 1)}
          disabled={!pagination.hasPreviousPage}
          className={`px-4 py-2 rounded-md ${pagination.hasPreviousPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {pagination.pageIndex} of {Math.ceil(pagination.totalCount / pagination.pageSize)}
        </span>
        <button 
          onClick={() => handlePageChange(pagination.pageIndex + 1)}
          disabled={!pagination.hasNextPage}
          className={`px-4 py-2 rounded-md ${pagination.hasNextPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;