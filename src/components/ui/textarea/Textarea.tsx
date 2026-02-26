'use client';

import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import { get } from 'lodash';
import RequiredAsterisk from '../requiredAsterisk';
import { FormMessage } from '../form';
import { Textarea as ShadTextarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  rules?: RegisterOptions;
  classNames?: string;
  labelClassName?: string;
  allowAsterisk?: boolean;
  maxLength?: number;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

const Textarea: React.FC<Props> = ({
  name,
  label,
  placeholder,
  rules = {},
  classNames = '',
  labelClassName = '',
  allowAsterisk = false,
  maxLength,
  rows = 4,
  cols,
  disabled = false,
  readOnly = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ name }) || '';
  const remainingChars = maxLength ? maxLength - value.length : null;

  const fieldError = get(errors, name);

  return (
    <div className="w-full">
      <div className="mt-2 space-y-[10px]">
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
              <span className="ms-[2px]">
                <RequiredAsterisk />
              </span>
            )}
          </label>
        )}
        <ShadTextarea
          id={name}
          {...register(name, rules)}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          className={cn(
            'peer block w-full py-[10px] px-4 rounded-[10px] border border-input shadow-none focus:outline-none',
            'placeholder:text-textSecondary placeholder:font-medium',
            'hover:placeholder:text-textSecondary focus:placeholder:text-textSecondary',
            'hover:border hover:border-primary focus:border-primary',
            'sm:text-sm sm:leading-6',

            value ? 'bg-input' : 'bg-white',

            errors[name] && '!border-red !focus:border-red',
            classNames,
          )}
          // className={`
          //   peer bg-input block w-full py-[10px] px-4 rounded-[10px]
          //   border border-input shadow-none focus:outline-none
          //   placeholder:text-textSecondary placeholder:font-medium
          //   hover:placeholder:text-textSecondary focus:placeholder:text-textSecondary
          //   hover:border hover:border-primary focus:border-primary
          //   sm:text-sm sm:leading-6
          //   ${fieldError ? '!border-error-500 !focus:border-error-500' : ''}
          //   ${classNames}
          // `}
        />
      </div>

      {maxLength && (
        <div className="flex justify-end">
          <span className={`mt-1 text-xs font-medium ${remainingChars === 0 ? 'text-error-500' : 'text-gray-800'}`}>{remainingChars} Char</span>
        </div>
      )}

      {fieldError && (
        <FormMessage>
          <span className="mt-2 text-error-500">{fieldError?.message as string}</span>
        </FormMessage>
      )}
    </div>
  );
};

export default Textarea;
