import { customToast } from '@/common/showToast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import Loader from '@/components/ui/loader/Loader';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import Textarea from '@/components/ui/textarea/Textarea';
import { ForgotPasswordFormDefaultValues, type ForgotPasswordFormTypes } from '@/forms/forgotPassword';
import { forgetPassword, sendSaleContact, setForgetPasswordEmail } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/Hooks';
import React, { use, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoAlertCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const ContactSaleForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const contactSaleForm = useForm<ForgotPasswordFormTypes>({
    defaultValues: ForgotPasswordFormDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: ForgotPasswordFormTypes) => {
    setIsSubmitting(true);
    dispatch(sendSaleContact(data))
      .unwrap()
      .then((res: any) => {
        customToast.success(res?.message);
        dispatch(setForgetPasswordEmail(data));
        navigate('/auth/login');
        contactSaleForm.reset();
      })
      .catch((err: any) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...contactSaleForm}>
      {isSubmitting && <Loader />}

      <div className="my-6 flex flex-col md:flex-row items-center gap-3 w-full">
        <div className="bg-input border border-secondary h-[68px] w-full md:w-1/2 p-3 rounded-lg flex item-center gap-2">
          <div className="h-[40px] w-[40px] rounded-lg bg-white flex items-center justify-center">
            <Icon icon="/icons/envelop.svg" stroke className="" />
          </div>
          <div>
            <label className="block text-textSecondary text-sm font-normal">Email</label>
            <label className="block text-primary text-base font-semibold">support@fishrook.com</label>
          </div>
        </div>
        <div className="bg-input border border-secondary h-[68px] w-full md:w-1/2 p-3 rounded-lg flex item-center gap-2">
          <div className="h-[40px] w-[40px] rounded-lg bg-white flex items-center justify-center">
            <Icon icon="/icons/phone.svg" stroke className="" />
          </div>
          <div>
            <label className="block text-textSecondary text-sm font-normal">Phone</label>
            <label className="block text-primary text-base font-semibold">+1 (512) 555-0100</label>
          </div>
        </div>
      </div>

      <form onSubmit={contactSaleForm.handleSubmit(onSubmit)} className="space-y-8">
        <div className="">
          <Input type="text" placeholder="John Doe" label="Full Name" classNames="bg-input w-full h-[56px] border-text-25" name="name" />
          <Input type="text" placeholder="Admin@Classengine.com" label="Email Address" classNames="bg-input w-full h-[56px] border-text-25" name="email" />
          <Textarea placeholder="Write Message here" name="message" label="Message" rows={4} labelClassName="bg-text-950 text-textLight-950" />
        </div>

        <Button
          type="submit"
          className="mt-6 2xl:mt-10 rounded-[10px] w-full h-[50px] bg-secondary hover:bg-secondary/80 text-center font-semibold text-[14px] 2xl:text-[18px] text-white"
        >
          Submit Support Request
        </Button>
      </form>
      <div className="mt-6 2xl:mt-10 text-[#898FA4] text-sm 2xl:text-base text-center">
        Need immediate assistance? <span className="text-secondary font-medium"> Call us at +1 (512) 555-0100</span>
      </div>

      {/* Footer info */}
      <div onClick={() => navigate('/auth/login')} className="cursor-pointer mt-6 2xl:mt-10 text-secondary font-semibold text-center underline">
        Back to Login
      </div>
    </FormProvider>
  );
};

export default ContactSaleForm;
