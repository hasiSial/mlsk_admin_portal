'use client';

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import NextImage from '@/components/ui/nextImage/NextImage';
import PasswordInput from '@/components/ui/password_input/password-input';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const SettingsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const settingForm = useForm();

  const onSubmit = () => {

  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-md">
        <h2 className="text-black text-2xl font-bold mb-4">
          Settings
        </h2>
        <div className='gap-3 flex flex-col justify-center items-center'>
          <NextImage image='/profile-2.png' classNames='rounded-full w-[130px] h-[130px]'/>
          <span className='text-sm flex items-center justify-center bg-primaryShade-50 h-[26px] w-fit rounded-2xl text-primary py-[2px] px-[10px]'>Upload Profile Picture</span>
        </div>
        <FormProvider {...settingForm}>
          <form onSubmit={settingForm.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-2 gap-3 justify-start mt-4">
              <div className="col-span-2 lg:col-span-1">
                  <Input type="text" name="name" placeholder="Enter Name" label="Full Name" allowAsterisk rules={{ required: 'Full name is required' }} classNames=""/>
              </div>
              <div className="col-span-2 lg:col-span-1">
                  <Input type="email" name="email" placeholder="Enter Email" label="Email Address" allowAsterisk rules={{
                      required: 'Email is not correct, please check.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email is not correct, please check.',
                      },
                    }}
                    classNames=""
                  />
              </div>
              <div className='col-span-2'>
                <PasswordInput
                  type="password"
                  name="oldPassword"
                  placeholder="Enter Old Password"
                  label="Password"
                  classNames="w-full bg-input"
                  rules={{
                    required: 'Old password is required',
                  }}
                />
              </div>
              <div className="col-span-2">
                <PasswordInput
                  type="password"
                  name="newPassword"
                  placeholder="Enter New Password"
                  label="New Password"
                  classNames="w-full bg-input"
                  rules={{
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  }}
                />
              </div>
              <div className="col-span-2">
                <PasswordInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  label="Confirm Password"
                  classNames="w-full bg-input"
                  rules={{
                    required: 'Confirm password is required',
                    validate: (value: string, formValues: any) =>
                      value === formValues.newPassword || 'Passwords do not match',
                  }}
                />
              </div>
            </div>
             <Button
                type="submit"
                // onClick={() => navigate(routes.Dashboard())}
                className="mt-6 2xl:mt-10 rounded-[10px] w-full h-[50px] bg-[#004F8C] hover:bg-[#004F8C]/80 text-center font-semibold text-[14px] 2xl:text-[18px] text-white"
              >
                Update Informaton
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SettingsPage;