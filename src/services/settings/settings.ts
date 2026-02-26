import api from '../Api';

// Get Admin Settings
export const getAdminBasicSettingsHandler = async () => {
  return api.get('admin/profile');
};
//get admin profile meta
export const getAdminSettingMetaHandler = async () => {
  return api.get('admin/profile/meta');
};
// Update Admin Settings
export const updateAdminBasicSettingsHandler = async (data: any) => {
  return api.patch('admin/profile', data);
};

// Update Admin Password
export const updateAdminPasswordHandler = async (data: any) => {
  return api.post('admin/auth/update-password', data);
};
