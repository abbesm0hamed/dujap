export const getBaseUrl = (path: string): string => {
  let baseUrl: string;

  if (import.meta.env.VITE_NODE_ENV === 'development') {
    // Development environment
    baseUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost'}:${import.meta.env.VITE_PORT || '5000'}`;
  } else {
    // Production environment (Vercel)
    baseUrl = import.meta.env.VITE_BACKEND_URL || 'https://dujap.vercel.app';

    // Add '/api' prefix for production API calls
    if (!path.startsWith('/api')) {
      path = `/api${path}`;
    }
  }

  // Ensure baseUrl doesn't end with a slash
  baseUrl = baseUrl.replace(/\/$/, '');

  // Ensure path starts with a slash
  path = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${path}`;
};
