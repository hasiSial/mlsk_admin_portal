export interface ResetPasswordFormTypes {
  token: string;
  password: string;
  passwordConfirmation?: string;
}

export const ResetPasswordFormDefaultValues: ResetPasswordFormTypes = {
  token: '',
  password: '',
  passwordConfirmation: '',
};
