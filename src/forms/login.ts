export interface LoginFormTypes {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const LoginFormDefaultValues: LoginFormTypes = {
  email: '',
  password: '',
  rememberMe: false,
};
