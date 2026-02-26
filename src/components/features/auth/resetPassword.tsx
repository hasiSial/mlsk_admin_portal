import { customToast } from '@/common/showToast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader/Loader';
import PasswordInput from '@/components/ui/password_input/password-input';
import type { ResetPasswordFormTypes } from '@/forms/resetPassword';
import { resetPassword, setForgetPasswordEmail } from '@/redux/auth/slice';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoAlertCircleSharp } from 'react-icons/io5';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { forgetPasswordEmail } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const resetPasswordForm = useForm<ResetPasswordFormTypes>();

  const onSubmit = (data: ResetPasswordFormTypes) => {
    setIsSubmitting(true);
    const payload = {
      token: token,
      password: data.password,
      passwordConfirmation: data?.passwordConfirmation,
    };
    dispatch(resetPassword(payload))
      .unwrap()
      .then((res: any) => {
        customToast.success(res.message);
        dispatch(setForgetPasswordEmail({ email: '' }));
        navigate('/');
        resetPasswordForm.reset();
      })
      .catch((err: any) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...resetPasswordForm}>
      {isSubmitting && <Loader />}

      <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="">
          <PasswordInput
            type="password"
            name="password"
            placeholder="Create password"
            label="Password"
            classNames="w-full h-[44px]"
            allowAsterisk={true}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value: /^(?=.*[A-Z]).{8,}$/, // at least 1 uppercase & min 8 chars
                message: 'Password must contain at least one capital letter',
              },
            }}
          />
        </div>

        <div className="">
          <PasswordInput
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm your password"
            label="Confirm Password"
            classNames="w-full h-[44px] border-text-25"
            allowAsterisk={true}
            rules={{
              required: 'Confirm Password is required',
              validate: (value: string) => value === resetPasswordForm.getValues('password') || 'Passwords do not match',
            }}
          />
        </div>

        <Button type="submit" className="rounded-[10px] w-full h-[44px] bg-primary hover:bg-primary/80 text-center font-semibold text-[14px] 2xl:text-[18px] text-white">
          Reset Password
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
