const routes = {
  login: () => 'api/v1/login',
  signup: () => 'api/v1/signup',
  data: (userId) => ('/api/v1/data', { headers: { Authorization: `Bearer ${userId}` } }),
};

export default routes;
