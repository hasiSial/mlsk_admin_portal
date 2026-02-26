import api from '../Api';

// Login Admin Function
export const adminLoginHandler = async (email: string, password: string) => {
  return api.post('/admin/auth/login', { email, password,playerId:'string',timezone:'string' });
};

export const forgetPasswordHandler = async (email: string) => {
  return api.post('/admin/auth/forget_password', { email });
};

export const otpVerifyHandler = async (email: string, otp: string) => {
  return api.post('/admin/auth/verify-otp', { email, otp });
};

export const resetPasswordHandler = async (token: string, password: string, passwordConfirmation: string) => {
  return api.post('/admin/auth/reset_password', { token, password, passwordConfirmation });
};

export const contactSaleHandler = async (name: string, email: string, message: string) => {
  return api.post('/admin/auth/support', { name, email, message });
};
