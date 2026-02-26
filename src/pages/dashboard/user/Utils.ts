import { useFormatDate } from '@/utils/helpers';
import { UserRole, UserStatus, type CreateUserPayload, type MakeUserPayloadProps, type singleUserType, type userActivitySnapShotType, type UserListTypes } from './Types';

export const getUserStatusBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    'active': 'w-fit flex items-center justify-center bg-greenOverlay text-green hover:bg-greenOverlay rounded-[10px] p-1 gap-3',
    'inactive': 'w-fit bg-redOverlay flex items-center justify-center text-red hover:bg-redOverlay rounded-[10px] p-1 gap-3',
  };

  return statusMap[status] || 'w-fit flex items-center justify-center bg-textSecondary text-white hover:bg-textSecondary/15 rounded-[10px] p-1 gap-3';
};

export const getUserRoleBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    Host: 'w-fit flex items-center justify-center bg-primary text-white hover:bg-primary/15 rounded-[10px] p-1 gap-3',
    Guest: 'w-fit bg-secondary flex items-center justify-center text-white hover:bg-secondary/15 rounded-[10px] p-1 gap-3',
    User: 'w-fit bg-secondary flex items-center justify-center text-white hover:bg-secondary/15 rounded-[10px] p-1 gap-3',
  };

  return statusMap[status] || 'w-fit flex items-center justify-center bg-textSecondary text-white hover:bg-textSecondary/15 rounded-[10px] p-1 gap-3';
};



export const userNotifications = [
  { label: 'Email Notifications', name: 'emailNotification' },
  { label: 'Booking Updates', name: 'bookingUpdates' },
  { label: 'SMS Notifications', name: 'smsNotification' },
  { label: 'Payment Confirmations', name: 'paymentConfirmation' },
  { label: 'Push Notifications', name: 'pushNotification' },
  { label: 'Marketing Emails', name: 'marketingEmail' },
  { label: 'Security Alerts (Required)', name: 'securityAlerts' },
];

export const accountSettingVerifications = [
  { label: 'Send verification email', name: 'sendVerificationMail' },
  { label: 'Require email verification before login', name: 'requireEmailVerificationBeforeLogin' },
  { label: 'Require phone verification', name: 'requirePhoneVerification' },
  { label: 'Require ID verification', name: 'requireIdVerification' },
];

export const userRolesOption = [
  { name: 'Admin', value: '1' },
  { name: 'Guest', value: '2' },
  { name: 'Host', value: '3' },
  { name: 'Both', value: '4' },
];

export const userStatusOptions = [
  { name: 'Active', value: '1001' },
  { name: 'Verify', value: '1002' },
  { name: 'Suspended', value: '1003' },
];

export const userGenderOptions = [
  { name: 'Male', value: '2001' },
  { name: 'Female', value: '2002' },
];

export const makeUserPayload = ({ data, profileImage }: any): CreateUserPayload => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    genderId: Number(data.genderId),
    avatar: profileImage?.url || '',

    companyPhoneNo: Number(data.companyPhoneNo),
    supportPhoneNo: Number(data.supportPhoneNo),
    email: data.email,
    phone: Number(data.phone),
    streetAddress: data.streetAddress,
    suite: data.suite,
    country: data.country || '',
    state: data.state,
    city: data.city,
    postalCode: data.postalCode || '',

    // roleId: Number(data.roleId),
    roles: [
      {
        roleId: Number(data.roleId),
      },
    ],
    accountStatusId: Number(data.accountStatusId),
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,

    verificationOptions: {
      sendVerificationMail: Boolean(data.sendVerificationMail),
      requireEmailVerificationBeforeLogin: Boolean(data.requireEmailVerificationBeforeLogin),
      requirePhoneVerification: Boolean(data.requirePhoneVerification),
      requireIdVerification: Boolean(data.requireIdVerification),
    },

    notificationPreferences: {
      emailNotification: Boolean(data.emailNotification),
      bookingUpdates: Boolean(data.bookingUpdates),
      smsNotification: Boolean(data.smsNotification),
      paymentConfirmation: Boolean(data.paymentConfirmation),
      pushNotification: Boolean(data.pushNotification),
      marketingEmail: Boolean(data.marketingEmail),
      securityAlerts: Boolean(data.securityAlerts),
    },
  };
};

export const userInfoPayload = (data: singleUserType) => {
  return [
    { title: 'User ID', value: data?.userId ?? '' },
    { title: 'User Role', value: data?.roles ?? '' },
    { title: 'Registration Date', value: useFormatDate(data?.registrationDate, 'YYYY-MM-DD') ?? '' },
    { title: 'Last Login', value: data?.lastActivity ? `${useFormatDate(data?.lastActivity, 'YYYY-MM-DD')} from ${data?.address}` : '' },
  ];
};

export const userActivitiesSnapshot = (data: userActivitySnapShotType) => {
  return [
    { title: 'Total Bookings', value: data?.totalBooking ?? 0, color: 'secondary' },
    { title: 'Total Ponds Listed', value: data?.totalPonds ?? 0, color: 'primary' },
  ];
};

export const userPaymentDetailCardInfo = [
  {
    id: '1',
    cardNumber: '**** **** **** 4567',
    expiration: '10/27',
    bank: 'Chase Bank',
    cardType: 'Credit',
    country: 'United States',
    image: '/images/master.png',
  },
  {
    id: '2',
    cardNumber: '**** **** **** 4567',
    expiration: '10/27',
    bank: 'Chase Bank',
    cardType: 'Debit',
    country: 'United States',
    image: '/images/visa.png',
  },
  {
    id: '3',
    cardNumber: '**** **** **** 4567',
    expiration: '10/27',
    bank: 'Chase Bank',
    cardType: 'Credit',
    country: 'United States',
    image: '/images/paypal.png',
  },
];

export const makeUserNotificationPayload = ({ data }: any) => {
  return {
    notificationPreferences: {
      emailNotification: Boolean(data.emailNotification),
      bookingUpdates: Boolean(data.bookingUpdates),
      smsNotification: Boolean(data.smsNotification),
      paymentConfirmation: Boolean(data.paymentConfirmation),
      pushNotification: Boolean(data.pushNotification),
      marketingEmail: Boolean(data.marketingEmail),
      securityAlerts: Boolean(data.securityAlerts),
    },
  };
};
