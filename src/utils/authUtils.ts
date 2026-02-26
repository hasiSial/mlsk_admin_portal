import { removeToken } from '@/redux/auth/slice';
import type { AppDispatch } from '@/redux/Store';

export const handleLogout = (dispatch: AppDispatch, navigate: (path: string) => void) => {
  try {
    dispatch(removeToken());

    localStorage.removeItem('token');
    sessionStorage.clear();

    navigate('/auth/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
