import { apiClient } from '@/lib/api';

export const userService = {
  // Get all users
  getUsers: async (params = {}) => {
    return await apiClient.get('/users', { params });
  },

  // Get user by ID
  getUserById: async id => {
    return await apiClient.get(`/users/${id}`);
  },

  // Create user
  createUser: async userData => {
    return await apiClient.post('/users', userData);
  },

  // Update user
  updateUser: async (id, userData) => {
    return await apiClient.put(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: async id => {
    return await apiClient.delete(`/users/${id}`);
  },

  // Upload avatar
  uploadAvatar: async (id, file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return await apiClient.post(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
