export const uidService = async () => {
  const { $axios } = useNuxtApp();
  return $axios.get('/jwtid');
};

export const logoutService = async () => {
  const { $axios } = useNuxtApp();
  return $axios.get('/auth/logout');
};

export const loginService = async (data) => {
  const { $axios } = useNuxtApp();
  return $axios.post('/auth/login', data);
};
