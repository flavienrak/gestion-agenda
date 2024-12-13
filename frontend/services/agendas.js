export const getAgendasService = async () => {
  const { $axios } = useNuxtApp();
  return $axios.get('/agendas');
};

export const createAgendasService = async (data) => {
  const { $axios } = useNuxtApp();
  return $axios.post('/agendas', data);
};

export const updategendasService = async (id, data) => {
  const { $axios } = useNuxtApp();
  return $axios.put(`/agendas/${id}`, data);
};

export const deleteAgendasService = async (id) => {
  const { $axios } = useNuxtApp();
  return $axios.delete(`/agendas/${id}`);
};
