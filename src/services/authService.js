import { apiClient } from '@/lib/api';

export const authService = {
  // Login user
  login: async credentials => {
    return await apiClient.post('/auth/login', credentials);
  },

  // Register user
  register: async userData => {
    return await apiClient.post('/auth/register', userData);
  },

  // Forgot password
  forgotPassword: async email => {
    return await apiClient.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token, password) => {
    return await apiClient.post('/auth/reset-password', { token, password });
  },

  // Verify email
  verifyEmail: async token => {
    return await apiClient.post('/auth/verify-email', { token });
  },

  // Refresh token
  refreshToken: async () => {
    return await apiClient.post('/auth/refresh');
  },

  // Logout
  logout: async () => {
    return await apiClient.post('/auth/logout');
  },

  // Get current user
  getCurrentUser: async () => {
    return await apiClient.get('/auth/me');
  },

  // Update profile
  updateProfile: async userData => {
    return await apiClient.put('/auth/profile', userData);
  },

  // Change password
  changePassword: async passwordData => {
    return await apiClient.put('/auth/change-password', passwordData);
  },
};
