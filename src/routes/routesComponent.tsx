import { AlertDialogProvider } from '@/common/customAlert';
import Loader from '@/components/ui/loader/Loader';
import AuthGuard from '@/layouts/authGuard';
import LayoutWrapper from '@/layouts/layoutsWrapper';
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// access client data page
const AccessClientData = lazy(() => import('@/pages/public/[id]/accessClientData'));
const AccessSpecificClientCategoryData = lazy(() => import('@/pages/public/[id]/specificClientCategoryDataDetail'));
const RequestAccess = lazy(() => import('@/pages/public/requestAccessPage'));
const AccessClientDependents = lazy(() => import('@/pages/public/[id]/accessClientDependents'));

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/login/login'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgotpassword/forgotPassword'));
const OtpVerificationPage = lazy(() => import('@/pages/auth/otpVerification/otpVerificationPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/resetPassword/resetPasswordPage'));
const ContactSalePage = lazy(() => import('@/pages/auth/contactsale/contactSale'));

// Dashboard Pages
const HomePage = lazy(() => import('@/pages/dashboard/home/homepage'));
const UserPageManagement = lazy(() => import('@/pages/dashboard/user/userPage'));
const ViewSingleUserPageManagement = lazy(() => import('@/pages/dashboard/user/viewUser/viewUserPage'));
const ProviderPageManagement = lazy(() => import('@/pages/dashboard/providers/providerPage'));
const ViewSingleProviderPageManagement = lazy(() => import('@/pages/dashboard/providers/providerView/providerViewPage'));

// const AnalyticsPage = lazy(() => import('@/pages/dashboard/analytics/analyticsPage'));
// const MessagePage = lazy(() => import('@/pages/dashboard/messages/messagePage'));
const SettingsPage = lazy(() => import('@/pages/dashboard/settings/settingsPage'));

const RoutesComponent: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <Routes>
        {/* redirect root */}
        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
        {/* <Route path="/" element={<Navigate to="/auth/login" replace />} /> */}

        {/* ================= AUTH ================= */}
        <Route path="/auth" 
          element={  
            <AuthGuard>
              <LayoutWrapper type="auth" />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<OtpVerificationPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="contact-sale" element={<ContactSalePage />} />
        </Route>

        {/* ================= DASHBOARD ================= */}
        <Route path="/dashboard" 
          element={
            <AuthGuard>
              <LayoutWrapper type="dashboard" />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />

          <Route path="user-management" element={<UserPageManagement />} />
          <Route path='user-management/:id/detail' element={<ViewSingleUserPageManagement />} />

          
          <Route path='providers' element={<ProviderPageManagement />} />
          <Route path='providers/:id/detail' element={<ViewSingleProviderPageManagement />} />


          {/* <Route path="messages" element={<MessagePage />} />
          <Route path="analytics" element={<AnalyticsPage />} /> */}
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* ================= PUBLIC CLIENT PAGE (NO LOGIN) ================= */}
        {/*  tabs page*/}
        <Route path="/user/access-client-account/:uuid" element={<AlertDialogProvider><AccessClientData /></AlertDialogProvider>} />
        <Route path="/public/:uuid/:categoryId/specific-access-client-data/:isParentCategory/:categoryName/:familyId" element={<AccessSpecificClientCategoryData />} />
        {/* form */}
        <Route path="/user/access-account/:uuid" element={<RequestAccess />} />
        <Route path="/user/access-account/:uuid/dependents" element={<AccessClientDependents />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
