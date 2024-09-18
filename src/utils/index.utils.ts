export const getBaseUrl = (path: string): string => {
  let baseUrl: string;

  if (import.meta.env.VITE_NODE_ENV === 'development') {
    // Development environment
    baseUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost'}:${import.meta.env.VITE_PORT || '5000'}/api`;
  } else {
    // Production environment (Vercel)
    baseUrl = `${import.meta.env.VITE_BACKEND_URL}` || 'https://dujap-server.vercel.app/api/v1';
  }

  return `${baseUrl}${path}`;
};
