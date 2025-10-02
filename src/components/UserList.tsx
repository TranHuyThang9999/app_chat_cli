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

  // Handle avatar click
  const handleAvatarClick = (user: UserProfile) => {
    console.log('Avatar clicked for user:', user);
    // You can add your custom logic here, such as opening a modal or navigating to user profile
    // Example: router.push(`/profile/${user.id}`);
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
      
      <div className="users-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 relative">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="user-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 relative group"
          >
            <div className="p-4">
              <div className="user-avatar flex justify-center mb-3 relative">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.nickName} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                    onClick={() => handleAvatarClick(user)}
                  />
                ) : (
                  <div 
                    className="default-avatar w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold border-2 border-gray-200 cursor-pointer"
                    onClick={() => handleAvatarClick(user)}
                  >
                    {user.nickName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="user-info text-center">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{user.nickName}</h3>
              </div>
            </div>
            
            {/* Hover overlay with details above the card */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-2">{user.nickName}</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>ID: {user.id}</p>
                  <p className="truncate">{user.email || 'No email'}</p>
                  <p>{user.phoneNumber || 'No phone'}</p>
                  <p className={`font-medium ${user.active ? 'text-green-600' : 'text-red-600'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
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