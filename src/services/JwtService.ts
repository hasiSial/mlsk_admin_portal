import { TOKEN_KEY } from '@/utils/constants';
import Cookies from 'js-cookie';

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  return window.localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  return window.localStorage.removeItem(TOKEN_KEY);
};
