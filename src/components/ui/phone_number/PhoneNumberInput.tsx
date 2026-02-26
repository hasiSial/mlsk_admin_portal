import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import RequiredAsterisk from '../requiredAsterisk';
import { FormMessage } from '../form';
import { cn } from '@/lib/utils';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberProps {
  name: string;
  label: string;
  rules?: any;
  classNames?: string;
  disabled?: boolean;
  allowAsterisk?: boolean;
  labelClassName?: string;
  defaultCountry?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberProps> = ({ labelClassName, allowAsterisk, disabled, name, label, rules = {}, classNames = '', defaultCountry = 'pk' }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError: any = errors?.[name];

  return (
    <div className="w-full">
      <div className="mt-2 relative space-y-[10px]">
        {label && (
          <label className={cn('text-sm 2xl:text-lg px-1 font-medium text-black', fieldError && '!text-red', labelClassName)}>
            {label}
            {allowAsterisk && (
              <span className="ms-[2px] text-rose-600">
                <RequiredAsterisk />
              </span>
            )}
          </label>
        )}

        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <PhoneInput
              country={defaultCountry}
              enableSearch
              disabled={disabled}
              value={field.value}
              onChange={(phone) => field.onChange(phone)}
              inputStyle={{
                width: '100%',
                height: '44px',
                borderRadius: '10px',
                border: fieldError ? '1px solid red' : '1px solid #e5e7eb',
                background: '#fff',
              }}
              buttonStyle={{
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                border: fieldError ? '1px solid red' : '1px solid #e5e7eb',
              }}
              containerStyle={{
                width: '100%',
              }}
            />
          )}
        />

        {fieldError && (
          <FormMessage>
            <span className="mt-2 text-red">{fieldError?.message}</span>
          </FormMessage>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
