import React, { useState } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import SVG from 'react-inlinesvg';
import RequiredAsterisk from '../requiredAsterisk';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { cn } from '@/lib/utils';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  rules?: RegisterOptions;
  classNames?: string;
  onChange?: (e: any) => void;
  minDate?: boolean | Date;
  maxDate?: string;
  allowAsterisk?: boolean;
  labelClassName?: string;
}

const PasswordInput: React.FC<Props> = ({
  allowAsterisk,
  type,
  placeholder,
  name,
  label,
  icon,
  iconPosition = null,
  rules = {},
  classNames = '',
  onChange,
  minDate,
  maxDate,
  labelClassName = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const value = useWatch({ name }) || '';
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getFormattedDate = (d: any) => {
    const date = d ? new Date(d) : new Date();

    date.setHours(0, 0, 0, 0);
    const isoString = date.toISOString();
    const formattedDate = isoString.slice(0, 19);
    return formattedDate;
  };

  const minFormattedDate = minDate ? getFormattedDate(minDate === true ? new Date() : minDate) : undefined;
  const maxFormattedDate = maxDate ? getFormattedDate(maxDate) : undefined;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-[100%]">
      {/* <label htmlFor={name} className="block whitespace-nowrap text-sm font-medium leading-6 text-gray-900">
        {label}
      </label> */}
      <div className="mt-2 relative space-y-[10px]">
        <label
          htmlFor={name}
          className={`
            text-sm 2xl:text-lg px-1 font-medium transition-colors duration-200
            text-black
            peer-hover:text-black
            peer-focus:text-black
            ${errors[name] ? '!text-red' : ''}
            ${labelClassName}
          `}
        >
          {label}
          {allowAsterisk && (
            <span className="ms-[2px]">
              <RequiredAsterisk />
            </span>
          )}
        </label>
        <input
          id={name}
          {...register(name, rules)}
          type={showPassword && type === 'password' ? 'text' : type}
          placeholder={placeholder}
          className={cn(
            'peer h-[44px] block w-full py-[10px] px-4 rounded-[10px] border border-input shadow-none focus:outline-none',
            'placeholder:text-textSecondary placeholder:font-medium',
            'hover:placeholder:text-textSecondary focus:placeholder:text-textSecondary',
            'hover:border hover:border-primary focus:border-primary',
            'sm:text-sm sm:leading-6',

            value ? 'bg-input' : 'bg-white',

            errors[name] && '!border-red !focus:border-red',
            iconPosition === 'left' && 'pl-12',
            iconPosition === 'right' && 'pr-12',
            classNames,
          )}
         
          min={minDate ? minFormattedDate : undefined}
          max={maxDate ? maxFormattedDate : undefined}
        />

        {icon && (
          <div
            className={`absolute inset-y-0 flex items-center ${
              iconPosition === 'left' ? 'left-3' : 'right-3'
            } text-text-25 peer-focus:text-textLight-975 peer-hover:text-textLight-975 transition-colors duration-200`}
          >
            {icon}
          </div>
        )}
        {/* {icon && <div className={`absolute inset-y-0 flex text-textLight-975 items-center ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>{icon}</div>} */}
        {/* Eye icon for password visibility toggle */}
        {type === 'password' && (
          <div onClick={togglePasswordVisibility} className="absolute inset-y-0 top-8 right-3 text-gray-400 flex items-center cursor-pointer">
            {showPassword ? (
              <Icon
                icon="/icons/eye.svg"
                className="w-5 h-5 text-textSecondary peer-focus:text-textSecondary peer-hover:text-textSecondary transition-colors duration-200"
                stroke={true}
              />
            ) : (
              <Icon
                icon="/icons/eye-slash.svg"
                className="w-5 h-5 text-textSecondary peer-focus:text-textSecondary peer-hover:text-textSecondary transition-colors duration-200"
                stroke={false}
                fill={false}
              />
              // <SVG
              //   src="/icons/eye-disable-white.svg"
              //   className="w-5 h-5 text-text-25 peer-focus:text-textLight-975 peer-hover:text-textLight-975 transition-colors duration-200"
              //   preProcessor={(code) => code.replace(/stroke=".*?"/g, 'stroke="currentColor"')}
              // />
            )}
          </div>
        )}
      </div>
      {errors[name] && <span className="text-error-500 text-sm">{errors[name]?.message as string}</span>}
    </div>
  );
};

export default PasswordInput;
