import ForgotPasswordForm from '@/components/features/auth/forgotPassword';
import NextImage from '@/components/ui/nextImage/NextImage';
import { useSelector } from 'react-redux';

const ForgotPasswordPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white"
      style={{
        backgroundImage: 'url("/images/auth-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mx-3 w-[500px] h-auto p-4 flex flex-col items-center">
        {/* Gap after logo */}
        <NextImage image="/logo.png" width={161} height={109} classNames="w-[161px] h-[109px]" />
        <h2 className="text-3xl font-semibold text-black mt-5">Forgot Password?</h2>
        <p className="text-center text-base font-normal mt-2 text-untitle-200">Please enter the email address associated with your account to receive a password reset link.</p>
        <div className="px-0 2xl:px-2 w-full">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
