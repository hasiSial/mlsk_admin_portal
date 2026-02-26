import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import RequiredAsterisk from '../requiredAsterisk';
import { get } from 'lodash';
import { FormMessage } from '../form';
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
  labelClassName?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  minDate?: boolean | Date;
  maxDate?: string;
  readOnly?: boolean;
  allowAsterisk?: boolean;
  maxLength?: number;
  disabled?: boolean;
  numericOnly?: boolean;
}

const Input: React.FC<Props> = ({
  type,
  placeholder,
  name,
  label,
  icon,
  iconPosition = null,
  rules = {},
  classNames = '',
  labelClassName = '',
  onChange,
  onBlur,
  minDate,
  maxDate,
  readOnly,
  allowAsterisk = false,
  maxLength,
  disabled = false,
  numericOnly = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ name }) || '';
  const remainingChars = maxLength ? maxLength - value.length : null;

  const getFormattedDate = (d: any) => {
    const date = d ? new Date(d) : new Date();

    date.setHours(0, 0, 0, 0);
    const isoString = date.toISOString();
    const formattedDate = isoString.slice(0, 19);
    return formattedDate;
  };

  const fieldError = get(errors, name);

  const minFormattedDate = minDate ? getFormattedDate(minDate === true ? new Date() : minDate) : undefined;
  const maxFormattedDate = maxDate ? getFormattedDate(maxDate) : undefined;

  return (
    <div className="w-[100%]">
      <div className="mt-2 space-y-2">
        {label && (
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
              <span className="ms-[2px] text-rose-600">
                <RequiredAsterisk />
              </span>
            )}
          </label>
        )}
        <input
          id={name}
          disabled={disabled}
          {...register(name, rules)}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          // onChange={(e) => {
          //   register(name, rules).onChange(e);
          //   onChange?.(e);
          // }}
          onBlur={(e) => {
            register(name, rules).onChange(e);
            onChange?.(e);
          }}
          // onKeyDown={(e) => {
          //   if (type === 'number' && (e.key === '-' || e.key === 'e' || e.key === 'E')) {
          //     e.preventDefault();
          //   }
          // }}
          onChange={(e) => {
            let value = e.target.value;

            if (numericOnly) {
              value = value.replace(/[^0-9]/g, '');
              e.target.value = value;
            }

            register(name, rules).onChange(e);
            onChange?.(e);
          }}
          onKeyDown={(e) => {
            if (numericOnly && !/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className={cn(
            'peer h-[44px] block w-full py-[10px] px-4 roundedDefault border border-baseStroke shadow-none focus:outline-none',
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
          //   className={`peer h-[48px] bg-white block w-full py-[10px] px-4 rounded-[10px]
          //     border border-input shadow-none focus:outline-none
          //     placeholder:text-textSecondary placeholder:font-medium
          //     hover:placeholder:text-textSecondary focus:placeholder:text-textSecondary
          //     hover:border hover:border-primary focus:border-primary
          //     sm:text-sm sm:leading-6
          //     ${errors[name] ? '!border-red !focus:border-red' : ''}
          //     ${iconPosition === 'left' ? 'pl-12' : ''}
          //     ${iconPosition === 'right' ? 'pr-12' : ''}
          //     ${classNames}

          // `}
          min={type == 'number' ? 1 : minDate ? minFormattedDate : undefined}
          max={maxDate ? maxFormattedDate : undefined}
          readOnly={readOnly}
        />

        {icon && (
          <div
            className={`absolute inset-y-0 flex items-center 
            ${iconPosition === 'left' ? 'left-3' : 'right-3'} 
            ${value ? 'text-textLight-25' : 'text-text-25'} 
            peer-focus:text-textLight-975 peer-hover:text-textLight-975 
            transition-colors duration-200`}
          >
            {icon}
          </div>
        )}
      </div>

      {maxLength && (
        <div className="flex justify-end">
          <span className={`mt-1 text-xs font-medium ${remainingChars === 0 ? 'text-error-500' : 'text-gray-800'}`}>{remainingChars} Char</span>
        </div>
      )}
      {fieldError && (
        <FormMessage>
          <span className="mt-2 text-red">{fieldError?.message as string}</span>
        </FormMessage>
      )}
    </div>
  );
};

export default Input;
