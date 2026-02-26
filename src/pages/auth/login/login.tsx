import LoginForm from '@/components/features/auth/login';
import NextImage from '@/components/ui/nextImage/NextImage';

const LoginPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full shadow-xl bg-white rounded-lg overflow-hidden">
        {/* Left Column - Image */}
        <div className="hidden lg:block p-4 lg:p-6 lg:gap-6">
          <NextImage image="/images/login-image.png" classNames="w-full h-full object-cover" />
        </div>

        {/* Right Column - Form */}
        <div className="w-[592px] flex flex-col justify-center items-start p-6 lg:p-12">
          <NextImage image="/logo.png" width={61} height={161} classNames="w-[140px] h-[140px]" />
          <p className="mt-4 text-black font-semibold text-2xl lg:text-3xl">Welcome To Med Legal Safe Keep</p>

          <div className="w-full mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
