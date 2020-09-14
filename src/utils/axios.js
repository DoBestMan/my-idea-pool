import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_HOST;

const INSTANCE = axios.create({
  baseURL,
});

const createAxiosResponseInterceptor = () => {
  const interceptor = INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /**
       * When response status is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      INSTANCE.interceptors.response.eject(interceptor);

      return INSTANCE.post('/access-tokens/refresh', {
        refresh_token: localStorage.getItem('refreshToken'),
      }).then((response) => {
        localStorage.setItem('token', response.data.jwt);
        error.response.config.headers['x-access-token'] = response.data.jwt;

        return INSTANCE(error.response.config);
      }).catch((error) => {
        localStorage.clear();
        window.location.href = '/login';

        return Promise.reject(error);
      }).finally(createAxiosResponseInterceptor);
    }
  );
}

createAxiosResponseInterceptor();

export default INSTANCE;
