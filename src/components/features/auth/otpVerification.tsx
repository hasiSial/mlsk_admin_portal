import { customToast } from '@/common/showToast';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Loader from '@/components/ui/loader/Loader';
import { OtpVerificationFormDefaultValues, type OtpVerificationFormTypes } from '@/forms/otpVerification';
import { verifyOTP } from '@/redux/auth/slice';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import React, { use, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const OtpVerificationForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { forgetPasswordEmail } = useAppSelector((state) => state.authReducer);

  const otpVerificationForm = useForm<OtpVerificationFormTypes>({
    defaultValues: OtpVerificationFormDefaultValues,
    mode: 'onChange',
  });

  const { setValue } = otpVerificationForm;
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    if (!data?.otp || data.otp.trim() === '') return;

    data = {
      ...data,
      email: forgetPasswordEmail,
    };

    setIsSubmitting(true);

    dispatch(verifyOTP(data))
      .unwrap()
      .then((res: any) => {
        customToast.success(res?.message || 'OTP verified successfully');
        navigate('/auth/reset-password');
        otpVerificationForm.reset();
      })
      .catch((err: any) => {
        customToast.error(err || 'Something went wrong');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <FormProvider {...otpVerificationForm}>
      {isSubmitting && <Loader />}
      <form onSubmit={otpVerificationForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full">
          <InputOTP className="w-full" onChange={(val) => setValue('otp', val)} maxLength={6}>
            <div className="w-full grid grid-cols-4">
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={0} className="rounded-full w-full h-14 border border-text-25 mx-2 text-2xl" />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={1} className="rounded-full w-full h-14 border border-text-25 mx-2 text-2xl" />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={2} className="rounded-full w-full h-14 border border-text-25 mx-2 text-2xl" />
              </InputOTPGroup>
              <InputOTPGroup className="gap-2 w-full">
                <InputOTPSlot index={3} className="rounded-full w-full h-14 border border-text-25 mx-2 text-2xl" />
              </InputOTPGroup>
            </div>
          </InputOTP>
        </div>

        <p className="text-center text-sm py-4 text-text-25 font-semibold">
          Didn’t receive the verification code?
          <Link to="#" className="text-white ps-2 text-sm font-bold">
            Resend
          </Link>
        </p>

        <Button
          onClick={otpVerificationForm.handleSubmit(onSubmit)}
          type="button"
          className="w-full h-[54px] rounded-full bg-primary-500 hover:bg-primary-600 text-center font-semibold text-[14px] 2xl:text-[18px] text-text-950"
        >
          Continue
        </Button>
      </form>
    </FormProvider>
  );
};

export default OtpVerificationForm;
