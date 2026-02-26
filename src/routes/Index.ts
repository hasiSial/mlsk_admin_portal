// Auth Routes
export const Login = () => '/auth/login';
export const ForgetPassword = () => '/auth/forgot-password';
export const verifyOtp = () => '/auth/verify-otp';
export const resetPassword = () => '/auth/reset-password';
export const contactSale = () => '/auth/contact-sale';

export const accessClientData = (id: number) => `/public/${id}/access-client-data`;
export const accessSpecficClientData = (isParentCategory: boolean, uuid: string, categoryId: number, name: string, familyId?: number) =>
  `/public/${uuid}/${categoryId}/specific-access-client-data/${isParentCategory}/${name}/${familyId}`;

// export const WorkoutEdit = (id: number) => `/dashboard/workouts/${id}`;

export const Dashboard = () => '/dashboard/home';

//users route
export const ManageUsers = () => '/dashboard/users';
export const ManageViewSingleUser = (id: number) => `/dashboard/user-management/${id}/detail`

//ponds route
export const ManageProviders = () => '/dashboard/providers';
export const ViewProvider = (id: number) => `/dashboard/providers/${id}/detail`;


//setting
export const Settings = () => '/dashboard/settings';
