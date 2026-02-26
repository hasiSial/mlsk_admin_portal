import type { CreateUserPayload } from '@/pages/dashboard/user/Types';
import { useFormatDate } from '@/utils/helpers';

export const UserManagementFormDefaultValues: CreateUserPayload = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  genderId: null,
  avatar: '',
  companyPhoneNo: null,
  supportPhoneNo: null,
  email: '',
  phone: null,
  streetAddress: '',
  suite: '',
  country: '',
  state: '',
  city: '',
  postalCode: '',
  // roleId: null,
  roles: [
    {
      roleId: null,
    },
  ],
  accountStatusId: null,
  password: '',
  passwordConfirmation: '',

  verificationOptions: {
    sendVerificationMail: false,
    requireEmailVerificationBeforeLogin: false,
    requirePhoneVerification: false,
    requireIdVerification: false,
  },
  notificationPreferences: {
    emailNotification: false,
    bookingUpdates: false,
    smsNotification: false,
    paymentConfirmation: false,
    pushNotification: false,
    marketingEmail: false,
    securityAlerts: false,
  },
};

export const SetUserManagementFormDefaultValues = (userDetail: CreateUserPayload) => {
  return {
    userId: userDetail?.userId,
    firstName: userDetail?.firstName ?? '',
    lastName: userDetail?.lastName ?? '',
    dateOfBirth: useFormatDate(userDetail?.dateOfBirth, 'YYYY-MM-DD') ?? '',
    genderId: userDetail?.genderId ?? null,
    avatar: userDetail?.avatar ?? '',
    companyPhoneNo: userDetail?.companyPhoneNo ?? null,
    supportPhoneNo: userDetail?.supportPhoneNo ?? null,
    email: userDetail?.email ?? '',
    phone: userDetail?.phone ?? null,
    streetAddress: userDetail?.streetAddress ?? '',
    suite: userDetail?.suite ?? '',
    // country: 'Pakistan',
    // state: 'Khyber Pakhtunkhwa',
    country: userDetail?.country ?? '',
    state: userDetail?.state ?? '',
    city: userDetail?.city ?? '',
    postalCode: userDetail?.postalCode ?? '',
    roleId: userDetail?.roles?.[0]?.roleId != null ? String(userDetail.roles[0].roleId) : null,
    accountStatusId: String(userDetail?.accountStatusId) ?? null,
    password: userDetail?.password ?? '',
    passwordConfirmation: userDetail?.passwordConfirmation ?? '',

    sendVerificationMail: userDetail?.verificationOptions?.sendVerificationMail ?? false,
    requireEmailVerificationBeforeLogin: userDetail?.verificationOptions?.requireEmailVerificationBeforeLogin ?? false,
    requirePhoneVerification: userDetail?.verificationOptions?.requirePhoneVerification ?? false,
    requireIdVerification: userDetail?.verificationOptions?.requireIdVerification ?? false,

    emailNotification: userDetail?.notificationPreferences?.emailNotification ?? false,
    bookingUpdates: userDetail?.notificationPreferences?.bookingUpdates ?? false,
    smsNotification: userDetail?.notificationPreferences?.smsNotification ?? false,
    paymentConfirmation: userDetail?.notificationPreferences?.paymentConfirmation ?? false,
    pushNotification: userDetail?.notificationPreferences?.pushNotification ?? false,
    marketingEmail: userDetail?.notificationPreferences?.marketingEmail ?? false,
    securityAlerts: userDetail?.notificationPreferences?.securityAlerts ?? false,

    // verificationOptions: {
    //   sendVerificationMail: userDetail?.verificationOptions?.sendVerificationMail ?? false,
    //   requireEmailVerificationBeforeLogin: userDetail?.verificationOptions?.requireEmailVerificationBeforeLogin ?? false,
    //   requirePhoneVerification: userDetail?.verificationOptions?.requirePhoneVerification ?? false,
    //   requireIdVerification: userDetail?.verificationOptions?.requireIdVerification ?? false,
    // },
    // notificationPreferences: {
    //   emailNotification: userDetail?.notificationPreferences?.emailNotification ?? false,
    //   bookingUpdates: userDetail?.notificationPreferences?.bookingUpdates ?? false,
    //   smsNotification: userDetail?.notificationPreferences?.smsNotification ?? false,
    //   paymentConfirmation: userDetail?.notificationPreferences?.paymentConfirmation ?? false,
    //   pushNotification: userDetail?.notificationPreferences?.pushNotification ?? false,
    //   marketingEmail: userDetail?.notificationPreferences?.marketingEmail ?? false,
    //   securityAlerts: userDetail?.notificationPreferences?.securityAlerts ?? false,
    // },
  };
};

export const UserNotificationFormDefaultValues = {
  // notificationPreferences: {
  emailNotification: false,
  bookingUpdates: false,
  smsNotification: false,
  paymentConfirmation: false,
  pushNotification: false,
  marketingEmail: false,
  securityAlerts: false,
  // },
};

export const SetUserNotificationFormDefaultValues = (data: any) => {
  return {
    // notificationPreferences: {
    emailNotification: !!data?.emailNotification,
    bookingUpdates: !!data?.bookingUpdates,
    smsNotification: !!data?.smsNotification,
    paymentConfirmation: !!data?.paymentConfirmation,
    pushNotification: !!data?.pushNotification,
    marketingEmail: !!data?.marketingEmail,
    securityAlerts: !!data?.securityAlerts,
    // },
  };
};
