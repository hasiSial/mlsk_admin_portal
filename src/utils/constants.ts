export const TOKEN_KEY = 'sessionToken';
export const FORGOT_EMAIL_KEY = 'forgot_email';
export const FORGOT_OTP_KEY = 'forgot_otp';
export const AVATAR_KEY = 'user_avatar';
export const USER_ID_KEY = 'user_id';
export const USER_NAME_KEY = 'user_name';
export const USER_ROLE = 'user_role';

export enum WorkoutLevels {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCE = 'Advance',
}

export const MAX_Char_LENGTH = 160;

export enum PageName {
  DASHBOARD = 'dashboard',
  USERS = 'users',
  PONDS = 'ponds',
  BOOKINGS = 'bookings',
  PAYMENTS = 'payments',
  REVIEWS = 'reviews',
  ANALYTICS = 'analytics',
  MESSAGES = 'messages',
  SETTINGS = 'settings',
}

export const USER_ROLES = [
  { roleId: 1, name: 'Admin' },
  { roleId: 2, name: 'Guest' },
  { roleId: 3, name: 'Host' },
];

export const USER_STATUSES = [
  { value: '1001', name: 'Active' },
  { value: '1002', name: 'Pending Verification' },
  { value: '1003', name: 'Suspended' },
];

export const GENDER = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export const Levels: { label: string; value: string }[] = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Expert', value: 'Expert' },
];

export const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];

export const fileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const CustomPaginationObj = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export const convertTo24HourFormat = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  let h = parseInt(hours, 10);
  if (modifier === 'PM' && h !== 12) h += 12;
  if (modifier === 'AM' && h === 12) h = 0;

  return `${String(h).padStart(2, '0')}:${minutes}`;
};

export const CriticalityTypes = {
  Routine: '48001',
  'Life Emergency': '48002',
};
