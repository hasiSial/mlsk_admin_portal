import OtpVerificationForm from '@/components/features/auth/otpVerification';
import NextImage from '@/components/ui/nextImage/NextImage';
import { useAppSelector } from '@/redux/Hooks';
import type { RootState } from '@/redux/Store';
import { useSelector } from 'react-redux';

const OtpVerificationPage = () => {
  const { forgetPasswordEmail } = useAppSelector((state) => state.authReducer);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: 'url("/images/auth-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="shadow-xl shadow-white/10 bg-text-850 w-[440px] h-auto rounded-[24px] border border-text-500 px-6 py-8 gap-8">
        <NextImage image="/images/enter-verification-code.svg" width={392} height={40} classNames="w-[392px] h-[40px] m-0 p-0" />
        <p className="mt-3 text-text-25 font-normal text-base text-center">Enter the 4-digit verification code we just sent to {forgetPasswordEmail ?? ''}</p>
        <div className="mt-8">
          <OtpVerificationForm />
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
