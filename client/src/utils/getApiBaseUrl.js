const stripTrailingSlash = (url) => (url.endsWith('/') ? url.slice(0, -1) : url);

const getApiBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : '';
  const baseUrl = envUrl || 'http://localhost:5000';
  return stripTrailingSlash(baseUrl);
};

export default getApiBaseUrl;

