export const getBaseUrl = (url: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `${import.meta.env.FRONTEND_URL}${url}`;
  } else {
    return `http://localhost:${import.meta.env.PORT ?? 5000}${url}`;
  }
};
