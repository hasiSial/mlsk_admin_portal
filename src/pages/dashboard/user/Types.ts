export enum UserRole {
  Host = 'Host',
  Guest = 'Guest',
  Admin = 'Admin',
}

export enum UserStatus {
  Active = 'Active',
  'Inactive' = 'Inactive',
}

export interface UserListTypes {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  register: string;
}

export interface UserListPayloadTypes {
  userId: number;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  isActive:boolean;
  createdAt: string;
}

export interface VerificationOptions {
  sendVerificationMail: boolean;
  requireEmailVerificationBeforeLogin: boolean;
  requirePhoneVerification: boolean;
  requireIdVerification: boolean;
}

export interface NotificationPreferences {
  emailNotification: boolean;
  bookingUpdates: boolean;
  smsNotification: boolean;
  paymentConfirmation: boolean;
  pushNotification: boolean;
  marketingEmail: boolean;
  securityAlerts: boolean;
}

export interface CreateUserPayload {
  userId?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  genderId: number | null;
  avatar: string;

  companyPhoneNo: number | null;
  supportPhoneNo: number | null;
  email: string;
  phone: number | null;
  streetAddress: string;
  suite: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  roles?: any;
  accountStatusId: number | null;
  password: string;
  passwordConfirmation: string;

  verificationOptions: VerificationOptions;
  notificationPreferences: NotificationPreferences;
}

export interface MakeUserPayloadProps {
  data: CreateUserPayload;
  profileImage?: { url: string | null; fullPath: string | null } | null;
}

export interface singleUserType {
  userId: number;
  name: string;
  email:string;
  phoneCountryCode:string;
  phone:string;
  fullPhone:string;
  avatar:string;
  referralCode:string;
  providerId:number|null;
  isPhoneVerified:boolean;
  isActive:boolean;
  createdAt:string;
  genderId:string;
  gender:string;
  dateOfBirth:Date | string;
  languageId:string;
  language:string;
  timezone:string;
  shareLocation:boolean;
}

export interface EmergencyContacts {
  userEmergencyContactId:number;
  name:string;
  email:string;
  phoneCountryCode:string;
  phone:string;
  fullPhone:string;
  relationId:string;
  relation:string;
  otherRelation:string|null;
  notes:string|null;
  isAccountRepresentative:boolean;
  isActive:boolean;
  createdAt:Date
  
}

export interface FamilyMembers {
  userFamilyId: number;
  name: string;
  nickName: string | null;
  genderId: string;
  gender: string;
  dateOfBirth: string; 
  isSelf: boolean;
  hasBirthMark: boolean;
  birthMark: string | null;
  isActive: boolean;
  createdAt: string; 
}

export interface SingleUserResponse {
  user: singleUserType;
  emergencyContacts: EmergencyContacts[];
  familyMembers:FamilyMembers[]
}
