import ResetPasswordForm from '@/components/features/auth/resetPassword';
import NextImage from '@/components/ui/nextImage/NextImage';

const ResetPasswordPage = () => {
  return (
    // <div
    //   className="min-h-screen flex items-center justify-center bg-gray-100"
    //   style={{
    //     backgroundImage: 'url("/images/auth-bg.svg")',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundRepeat: 'no-repeat',
    //   }}
    // >
    //   <div className="mx-3 shadow-xl shadow-[#C4C4C4]/10 bg-white w-[500px] h-auto rounded-[10px] border border-textSecondary p-4 flex flex-col items-center">
    //     {/* Logo + text */}
    //     <div className="flex flex-col items-center space-y-3">
    //       <NextImage image="/images/main-logo-bg-white.svg" width={247} height={35} classNames="w-[247px] h-[35px]" />
    //       <h5 className="text-primary font-semibold text-xl">Reset Password</h5>
    //       <p className="text-textSecondary font-normal text-base text-center px-6">Set a new password for your account, make sure its different from your old one</p>
    //     </div>
    //     <div className="px-0 2xl:px-2 w-full">
    //       <ResetPasswordForm />
    //     </div>
    //   </div>
    // </div>
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
        <h2 className="text-3xl font-semibold text-black mt-5">Reset Password?</h2>
        <p className="text-center text-base font-normal mt-2 text-untitle-200">Enter your new password</p>
        <div className="px-0 2xl:px-2 w-full">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
