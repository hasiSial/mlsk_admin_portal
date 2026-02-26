// 'use client';

// import React, { useState } from 'react';
// import { Controller, useFormContext, useWatch } from 'react-hook-form';
// import clsx from 'clsx';
// import { get } from 'lodash';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import RequiredAsterisk from '../requiredAsterisk';
// import { FormMessage } from '../form';
// import { X } from 'lucide-react';

// interface Props {
//   name: string;
//   label: string;
//   data: Array<Data>;
//   value?: string | number;
//   rules?: any;
//   classNames?: string;
//   labelClassName?: string;
//   contentWidth?: string;
//   placeholder?: string;
//   allowAsterisk?: boolean;
//   disabled?: boolean;
//   isSearchAble?: boolean;
//   onChange?: (val: string) => void;
//   icon?: React.ReactElement;
//   iconPosition?: 'left' | 'right';
//   allowClear?: boolean;
// }

// interface Data {
//   name: string;
//   value: string | number;
//   icon?: React.ReactElement;
// }

// const Dropdown: React.FC<Props> = ({
//   name,
//   label,
//   data,
//   value = '',
//   rules = {},
//   classNames = '',
//   labelClassName = '',
//   contentWidth = '',
//   placeholder = 'Select...',
//   allowAsterisk = false,
//   disabled = false,
//   isSearchAble = false,
//   onChange,
//   icon,
//   iconPosition = 'left',
//   allowClear = false,
// }) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const fieldError = get(errors, name);
//   const [searchQuery, setSearchQuery] = useState('');
//   const selectedValue = useWatch({ name }) || '';

//   const filteredData = data?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

//   return (
//     <div className="w-full">
//       <div className="mt-2 relative space-y-[10px]">
//         {/* Label */}
//         {label && (
//           <label
//             htmlFor={name}
//             className={`
//             text-sm 2xl:text-lg px-1 font-medium transition-colors duration-200
//             text-black
//             peer-hover:text-black
//             peer-focus:text-black
//             ${fieldError ? '!text-red' : ''}
//             ${labelClassName}
//           `}
//           >
//             {label}
//             {allowAsterisk && (
//               <span className="ms-[2px]">
//                 <RequiredAsterisk />
//               </span>
//             )}
//           </label>
//         )}

//         {/* Controller */}
//         <Controller
//           name={name}
//           control={control}
//           defaultValue={value ?? ''}
//           rules={rules}
//           render={({ field }) => (
//             <Select
//               disabled={disabled}
//               value={field.value ?? ''}
//               onValueChange={(val) => {
//                 field.onChange(val);
//                 onChange?.(val);
//               }}
//             >
//               <div className="relative">
//                 {/* Select Trigger */}
//                 <SelectTrigger
//                   className={clsx(
//                     `peer h-[48px] bg-white w-full px-4 rounded-lg flex items-center justify-between
//              border border-input shadow-none outline-none
//              hover:border-primary focus:border-primary transition`,
//                     fieldError && '!border-red-500 !focus:border-red-500',
//                     classNames,
//                     selectedValue ? 'bg-input' : 'bg-white',
//                   )}
//                 >
//                   <div className="flex items-center gap-2 w-full text-left">
//                     {/* Left Icon Inside Trigger */}
//                     {icon && iconPosition === 'left' && <span className="text-gray-400">{icon}</span>}

//                     <SelectValue placeholder={placeholder} className="text-gray-700 flex-1" />

//                     {/* Right Icon Inside Trigger */}
//                     {icon && iconPosition === 'right' && <span className="text-gray-400">{icon}</span>}
//                   </div>
//                 </SelectTrigger>
//               </div>

//               {/* Dropdown Content */}
//               <SelectContent className={clsx(contentWidth || 'w-full', 'bg-white rounded-2xl p-1 border border-gray-200')}>
//                 {isSearchAble && (
//                   <div className="p-2">
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       defaultValue={searchQuery} // controlled ki jagah defaultValue
//                       ref={(el) => {
//                         if (el && el.value !== searchQuery) {
//                           el.value = searchQuery;
//                         }
//                       }}
//                       onInput={(e: React.FormEvent<HTMLInputElement>) => {
//                         setSearchQuery(e.currentTarget.value);
//                       }}
//                       onKeyDown={(e) => e.stopPropagation()}
//                       className="w-full px-2 py-1 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                   </div>
//                 )}
//                 <div className="space-y-1">
//                   {filteredData?.length ? (
//                     filteredData.map((item, idx) => (
//                       <SelectItem
//                         value={String(item.value)}
//                         key={idx}
//                         className={`text-sm p-3 rounded-lg cursor-pointer flex items-center gap-2
//                       text-gray-700 hover:bg-primary hover:text-white
//                       data-[state=checked]:bg-primary data-[state=checked]:text-white`}
//                       >
//                         {item.icon && <span>{item.icon}</span>}
//                         <span>{item.name}</span>
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="p-2 text-sm text-gray-500">No options found</div>
//                   )}
//                 </div>
//               </SelectContent>
//             </Select>
//           )}
//         />

//         {/* Validation Error */}
//         {fieldError && (
//           <FormMessage>
//             <span className="mt-2 text-red-500">{fieldError?.message as string}</span>
//           </FormMessage>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dropdown;
'use client';

import React, { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import { get } from 'lodash';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RequiredAsterisk from '../requiredAsterisk';
import { FormMessage } from '../form';
import { X } from 'lucide-react';

interface Props {
  name: string;
  label: string;
  data: Array<Data>;
  value?: string | number;
  rules?: any;
  classNames?: string;
  labelClassName?: string;
  contentWidth?: string;
  placeholder?: string;
  allowAsterisk?: boolean;
  disabled?: boolean;
  isSearchAble?: boolean;
  onChange?: (val: string) => void;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  allowClear?: boolean;
}

interface Data {
  name: string;
  value: string | number;
  icon?: React.ReactElement;
}

const Dropdown: React.FC<Props> = ({
  name,
  label,
  data,
  value = '',
  rules = {},
  classNames = '',
  labelClassName = '',
  contentWidth = '',
  placeholder = 'Select...',
  allowAsterisk = false,
  disabled = false,
  isSearchAble = false,
  onChange,
  icon,
  iconPosition = 'left',
  allowClear = true,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedValue = useWatch({ name }) || '';

  const filteredData = data?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full">
      <div className="mt-2 relative space-y-2">
        {/* Label */}
        {label && (
          <label htmlFor={name} className={clsx('text-sm 2xl:text-lg px-1 font-medium transition-colors duration-200 text-black', fieldError && '!text-red', labelClassName)}>
            {label}
            {allowAsterisk && (
              <span className="ms-[2px] text-rose-600">
                <RequiredAsterisk />
              </span>
            )}
          </label>
        )}

        {/* Controller */}
        <Controller
          name={name}
          control={control}
          defaultValue={value ?? ''}
          rules={rules}
          render={({ field }) => (
            <Select
              disabled={disabled}
              value={field.value ?? ''}
              onValueChange={(val) => {
                field.onChange(val);
                onChange?.(val);
              }}
            >
              <div className="relative">
                {/* Select Trigger */}
                <SelectTrigger
                  className={clsx(
                    `peer h-[44px] bg-white w-full px-4 rounded-xl flex items-center justify-between
                     border border-input shadow-none outline-none
                     hover:border-primary focus:border-primary transition`,
                    fieldError && '!border-red-500 !focus:border-red-500',
                    classNames,
                    selectedValue ? 'bg-input' : 'bg-white',
                  )}
                >
                  <div className="flex items-center gap-2 w-full text-left">
                    {/* Left Icon */}
                    {icon && iconPosition === 'left' && <span className="text-gray-400">{icon}</span>}

                    {/* Selected Value */}
                    <SelectValue placeholder={placeholder} className="text-gray-700 flex-1" />

                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                      {/* Clear Button */}
                      {allowClear && selectedValue && (
                        <X
                          size={16}
                          className="cursor-pointer text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dropdown toggle
                            field.onChange(''); // Clear value
                            onChange?.('');
                          }}
                        />
                      )}
                      {icon && iconPosition === 'right' && <span className="text-gray-400">{icon}</span>}
                    </div>
                  </div>
                </SelectTrigger>
              </div>

              {/* Dropdown Content */}
              <SelectContent className={clsx(contentWidth || 'w-full', 'bg-white rounded-2xl p-1 border border-gray-200')}>
                {/* Searchable Input */}
                {isSearchAble && (
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      defaultValue={searchQuery}
                      onInput={(e: React.FormEvent<HTMLInputElement>) => setSearchQuery(e.currentTarget.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      className="w-full px-2 py-1 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  {/* Unselect Option */}
                  {/* {allowClear && selectedValue && (
                    <X
                      size={16}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent dropdown toggle
                        field.onChange(''); // Clear value
                        onChange?.('');
                      }}
                    />
                  )} */}
                  {allowClear && selectedValue && (
                    <div
                      className="mb-1 px-3 py-2 text-sm text-primary hover:text-white hover:bg-secondary cursor-pointer flex items-center justify-between rounded-lg"
                      title="Clear selection"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        field.onChange('');
                        onChange?.('');
                      }}
                    >
                      <span>Unselect</span>
                      <span>✕</span>
                    </div>
                  )}

                  {/* List Options */}
                  {filteredData?.length ? (
                    filteredData.map((item, idx) => (
                      <SelectItem
                        value={String(item.value)}
                        key={idx}
                        className="text-sm p-3 rounded-lg cursor-pointer flex items-center gap-2 text-gray-700 hover:bg-primary hover:text-white data-[state=checked]:bg-primary data-[state=checked]:text-white"
                      >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.name}</span>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">No options found</div>
                  )}
                </div>
              </SelectContent>
            </Select>
          )}
        />

        {/* Validation Error */}
        {fieldError && (
          <FormMessage>
            <span className=" text-red">{fieldError?.message as string}</span>
          </FormMessage>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
