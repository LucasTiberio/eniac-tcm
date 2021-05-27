import axios from 'axios';
import { isAuthenticated, getTokenAuthentication } from '@poupachef/support/helpers/authentication';

const api = () => {
  const getBearerToken = () => {
    if (isAuthenticated()) {
      return `Bearer ${getTokenAuthentication()}`;
    }
    return '';
  };

  return axios.create({
    timeout: 30000,
    baseURL: 'http://localhost:3002/api',
    headers: {
      common: {
        Authorization: getBearerToken(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'access-control-allow-origin': '*',
        Pragma: 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  });
};

export default api();
