import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const blogApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/blogs', { params }),
  getById: (id: string) => api.get(`/blogs/${id}`),
  getByIdAdmin: (id: string) => api.get(`/blogs/admin/${id}`),
  getCategories: () => api.get('/blogs/categories/all'),
  create: (data: FormData) => api.post('/blogs', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) => api.put(`/blogs/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

export const contactApi = {
  send: (data: Record<string, unknown>) => api.post('/contact/send', data),
  getAll: () => api.get('/contact/all'),
  reply: (data: Record<string, unknown>) => api.post('/contact/reply', data),
  updateLeadStatus: (id: string, leadStatus: string) => api.put(`/contact/${id}/lead-status`, { leadStatus }),
  toggleFollowUp: (id: string, followUpEnabled: boolean) => api.put(`/contact/${id}/follow-up`, { followUpEnabled }),
};

export const notificationApi = {
  getAll: (limit?: number) => api.get('/notifications', { params: { limit } }),
  markRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

export const followUpApi = {
  getTemplates: () => api.get('/followups/templates'),
  saveTemplate: (data: Record<string, unknown>) => api.post('/followups/templates', data),
  deleteTemplate: (id: string) => api.delete(`/followups/templates/${id}`),
  getLogs: (contactId?: string) => api.get('/followups/logs', { params: contactId ? { contactId } : {} }),
  runNow: () => api.post('/followups/run-now'),
};

export const mailboxApi = {
  getFolderCounts: () => api.get('/mailbox/folders'),
  getFolderMessages: (folder: string, params?: Record<string, unknown>) => api.get(`/mailbox/folders/${folder}`, { params }),
  getMessage: (id: string) => api.get(`/mailbox/message/${id}`),
  moveMessage: (id: string, folder: string) => api.put(`/mailbox/message/${id}/move`, { folder }),
  deleteMessage: (id: string) => api.delete(`/mailbox/message/${id}`),
};

export const chatApi = {
  start: (username: string) => api.post('/chat/start', { username }),
  send: (chatId: string, userMessage: string) => api.post('/chat/send', { chatId, userMessage }),
  getHistory: (chatId: string) => api.get(`/chat/${chatId}`),
  getAll: (params?: Record<string, unknown>) => api.get('/chat/all-users', { params }),
};

export const adminApi = {
  login: (email: string, password: string, rememberMe?: boolean) => api.post('/admin/login', { email, password, rememberMe }),
  getProfile: () => api.get('/admin/profile'),
  updateProfile: (data: Record<string, unknown>) => api.put('/admin/profile', data),
  getStats: () => api.get('/admin/stats'),
};

export const commentApi = {
  getAll: (blogId: string) => api.get(`/comments/${blogId}/comments`),
  add: (blogId: string, data: Record<string, unknown>) => api.post(`/comments/${blogId}/comments`, data),
  like: (commentId: string) => api.put(`/comments/${commentId}/like`),
  delete: (commentId: string) => api.delete(`/comments/${commentId}`),
};

export const knowledgeApi = {
  getPortfolio: () => api.get('/knowledge/portfolio'),
  getAll: () => api.get('/knowledge'),
  update: (data: Record<string, unknown>) => api.put('/knowledge', data),
  addCategory: (data: Record<string, unknown>) => api.post('/knowledge/category', data),
  addLink: (categoryName: string, data: Record<string, unknown>) => api.post(`/knowledge/category/${categoryName}/link`, data),
  deleteCategory: (categoryName: string) => api.delete(`/knowledge/category/${categoryName}`),
};

export const partnershipApi = {
  submit: (data: Record<string, unknown>) => api.post('/partnership/submit', data),
  getAll: (params?: Record<string, unknown>) => api.get('/partnership/applications', { params }),
  updateStatus: (id: string, data: Record<string, unknown>) => api.put(`/partnership/applications/${id}/status`, data),
};

export const analyticsApi = {
  track: (data: Record<string, unknown>) => api.post('/analytics/track', data),
  getSummary: (range: string) => api.get('/analytics/summary', { params: { range } }),
};

export const getImageUrl = (path: string): string => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
};
