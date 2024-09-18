export const getBaseUrl = (path: string): string => {
  let baseUrl: string;

  if (import.meta.env.VITE_NODE_ENV == 'development') {
    baseUrl = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_PORT}` || 'http://localhost:5000';
  } else {
    baseUrl = `${import.meta.env.VITE_BACKEND_URL}` || "https://dujap-cars.vercel.app";
  }

  // Ensure baseUrl doesn't end with a slash and path starts with a slash
  baseUrl = baseUrl.replace(/\/$/, '');
  path = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${path}`;
};
