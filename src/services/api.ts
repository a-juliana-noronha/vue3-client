import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  // withCredentials: true
});

instance.interceptors.request.use((config) => {
  const auth = useAuthStore();

  if (auth.token) {
    config.headers['Authorization'] = `Bearer ${auth.token}`;
  }

  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
});

instance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    if (error?.response?.status === 401) {
      const { logoff } = useAuthStore()
      logoff()

      if(error?.response?.config?.url !== '/auth/login') {
        router.push({ name: 'login' });
      }

      // await store.renewToken()
      // if (error?.config?.url !== '/auth/refreshToken') {
      // } else {
      //   const router = useRouter()
      //   router.push({ name: 'login' })
      // }
    }

    return Promise.reject(error);
  }
);

export default instance;
