// import { TOKEN_KEY } from '@/utils/constants';
// import { Navigate, useLocation } from 'react-router-dom';
// import * as routes from '@/routes/Index';

// const AuthGuard = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);

//   const authRoutes = [routes.Login(), routes.ForgetPassword(), routes.verifyOtp(), routes.resetPassword()];

//   if (isAuthenticated && authRoutes.includes(location.pathname)) {
//     return <Navigate to="/" replace />;
//   }
//   if (!isAuthenticated && authRoutes.includes(location.pathname)) {
//     return children;
//   }

//   return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
// };

// export default AuthGuard;
import { TOKEN_KEY } from '@/utils/constants';
import { Navigate, useLocation } from 'react-router-dom';
import * as routes from '@/routes/Index';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);

  // Routes that can be accessed without authentication
  const publicRoutes = [routes.Login(), routes.ForgetPassword(), routes.verifyOtp(), routes.resetPassword(), routes.accessClientData(0)];

  // If logged in and trying to access a public route, redirect home
  if (isAuthenticated && publicRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  // If not logged in and accessing a public route, allow access
  if (!isAuthenticated && publicRoutes.includes(location.pathname)) {
    return children;
  }

  // If logged in, allow access to private routes
  return isAuthenticated ? children : <Navigate to={routes.Login()} replace />;
};

export default AuthGuard;
