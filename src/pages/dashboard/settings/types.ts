export interface SettingUserInfo {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface AmenitiesType {
  id?: number | string;
  amenityId?: number | string;
  icon: string;
  name: string;
  description: string;
}
