// src/api/base44Client.js

// Stub para compatibilidade com AuthContext (sem dependências externas)
export const base44 = {
  auth: {
    me: async () => null,
    logout: () => {},
    redirectToLogin: () => {},
  },
};

// Helper simples usando fetch nativo
export const apiClient = {
  get: (url) => fetch(url).then(res => res.json()),
  post: (url, data) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
};

export default apiClient;
