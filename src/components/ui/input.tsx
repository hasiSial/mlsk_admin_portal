// export { Input };
import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, iconPosition = 'left', ...props }, ref) => {
  return (
    <div className="relative w-full mt-2">
      {icon && <div className={cn('absolute inset-y-0 flex items-center text-textLight-975 pointer-events-none', iconPosition === 'left' ? 'left-3' : 'right-3')}>{icon}</div>}
      <input
        type={type}
        className={cn(
          'flex h-9 w-full roundedDefault border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-backgroundShade placeholder:text-backgroundShade focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
