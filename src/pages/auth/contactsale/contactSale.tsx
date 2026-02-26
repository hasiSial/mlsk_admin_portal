import ContactSaleForm from '@/components/features/auth/contactSale';
import NextImage from '@/components/ui/nextImage/NextImage';

const ContactSalePage = () => {
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
      {/* <div className="mx-3 shadow-xl shadow-[#C4C4C4]/10 bg-white w-[577px] h-4/5 rounded-[10px] border border-textSecondary p-4 flex flex-col items-center"> */}
      {/* Logo + text */}
      <div className="mx-3 shadow-xl shadow-[#C4C4C4]/10 bg-white w-[577px] h-auto lg:h-[92vh] overflow-y-auto rounded-[10px] border border-textSecondary p-4">
        <div className="flex flex-col items-center space-y-3">
          <NextImage image="/images/main-logo-bg-white.svg" width={247} height={35} classNames="w-[247px] h-[35px]" />
          <h5 className="text-primary font-semibold text-xl">Contact Support</h5>
          <p className="text-textSecondary font-normal text-base text-center px-6">
            Need help? Our support team is here to assist you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Gap after logo */}
        <div className="px-0 2xl:px-2 w-full">
          <ContactSaleForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSalePage;
