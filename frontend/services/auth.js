export const uidService = async () => {
  const { $axios } = useNuxtApp();
  return $axios.get('/jwtid');
};

export const loginService = async (data) => {
  const { $axios } = useNuxtApp();
  return $axios.post('/auth/login', data);
};
