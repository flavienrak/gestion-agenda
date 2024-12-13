import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: nuxtApp.$config.public.BACKEND_URI,
    withCredentials: true,
  });

  nuxtApp.provide('axios', api);
});
