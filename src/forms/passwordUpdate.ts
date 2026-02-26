export interface PasswordUpdateFormTypes {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordUpdateFormDefaultValues: PasswordUpdateFormTypes = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const SetPasswordUpdateFormDefaultValues = (settings: any) => {
  return {
    oldPassword: settings.oldPassword || '',
    newPassword: settings.newPassword || '',
    confirmPassword: settings.confirmPassword || '',
  };
};
