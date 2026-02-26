import { customToast } from '@/common/showToast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import Loader from '@/components/ui/loader/Loader';
import { ForgotPasswordFormDefaultValues, type ForgotPasswordFormTypes } from '@/forms/forgotPassword';
import { forgetPassword, setForgetPasswordEmail } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/Hooks';
import React, { use, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoAlertCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const forgotPasswordForm = useForm<ForgotPasswordFormTypes>({
    defaultValues: ForgotPasswordFormDefaultValues,
    mode: 'onChange',
  });

  // const onSubmit = (data: ForgotPasswordFormTypes) => {
  //   navigate('/auth/verify-otp', { state: { email: data.email } });
  // };
  const onSubmit = (data: ForgotPasswordFormTypes) => {
    setIsSubmitting(true);
    dispatch(forgetPassword(data))
      .unwrap()
      .then((res: any) => {
        const url = new URL(res.data);
        const token = url.searchParams.get('token');
        customToast.success(res?.message || 'Email has been sent to your given email address.');
        dispatch(setForgetPasswordEmail(data));
        navigate(`/auth/reset-password?token=${token}`);

        forgotPasswordForm.reset();
      })
      .catch((err: any) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...forgotPasswordForm}>
      {isSubmitting && <Loader />}

      <form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <Input
            type="text"
            placeholder="Enter Email Address"
            label="Email Address"
            classNames="w-full h-[44px]"
            name="email"
            allowAsterisk={true}
            rules={{
              required: 'Email is not correct, please check.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is not correct, please check.',
              },
            }}
          />
        </div>

        <Button
          onClick={forgotPasswordForm.handleSubmit(onSubmit)}
          type="button"
          className="rounded-[10px] w-full h-[44px] bg-primary hover:bg-primary/80 text-center font-semibold text-[14px] 2xl:text-[18px] text-white"
        >
          Send Email{' '}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
