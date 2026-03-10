export const appParams = {
  appId: import.meta.env.VITE_APP_ID || null,
  appBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  token: null,
  functionsVersion: import.meta.env.VITE_FUNCTIONS_VERSION || 'prod',
};
