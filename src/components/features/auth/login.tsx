import { customToast } from '@/common/showToast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Input from '@/components/ui/input/input';
import Loader from '@/components/ui/loader/Loader';
import PasswordInput from '@/components/ui/password_input/password-input';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { LoginFormTypes } from '@/forms/login';
import { useAuth } from '@/hooks/firebaseUseAuth';
import { adminLogin, setToken, setUserInfo } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/Hooks';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';

const LoginForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loginForm = useForm<LoginFormTypes>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { firebaseLogin } = useAuth();

  const onSubmit = (data: LoginFormTypes) => {
    setIsSubmitting(true);
    dispatch(adminLogin(data))
      .unwrap()
      .then(async (response) => {
        dispatch(setToken(response?.data?.accessToken));
        dispatch(
          setUserInfo({
            avatar: response.data.avatar,
            userId: response.data.userId,
            name: response.data.name,
            role: response.data.role,
          }),
        );

        // try {
        //   await firebaseLogin();
        // } catch (err) {
        //   setIsSubmitting(false);
        //   console.error('Firebase login error', err);
        // }

        navigate(routes.Dashboard());
        customToast.success(response.message || 'Login successful!');
      })
      .catch((error) => {
        setIsSubmitting(false);
        customToast.error(error || 'Login failed. Please try again.');
      });
  };

  return (
    <FormProvider {...loginForm}>
      {isSubmitting && <Loader />}

      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col">
        {/* Input fields */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter Email Address"
            label="Email Address"
            classNames="w-full bg-input"
            name="email"
            rules={{
              required: 'Email is not correct, please check.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is not correct, please check.',
              },
            }}
            onBlur={(e) => e.target.reportValidity()}
          />
          <PasswordInput
            type="password"
            name="password"
            placeholder="Enter Password"
            label="Password"
            classNames="w-full bg-input"
            rules={{
              required: 'Password is required',
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="text-black font-medium">Remember me</span>
            </div>

            <Link to="/auth/forgot-password" className="text-[#004F8C] text-sm 2xl:text-base font-medium cursor-pointer">
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Button /auth/forgot-password*/}
        <Button
          type="submit"
          // onClick={() => navigate(routes.Dashboard())}
          className="mt-6 2xl:mt-10 rounded-[10px] w-full h-[50px] bg-[#004F8C] hover:bg-[#004F8C]/80 text-center font-semibold text-[14px] 2xl:text-[18px] text-white"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
