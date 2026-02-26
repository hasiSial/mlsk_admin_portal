import React, { type ReactNode } from 'react';
import { Button } from '../button';
import { CrossIcon } from '@/utils/icons';
interface Props {
  children: React.ReactNode;
  allowLogo?: boolean;
  contentLocation?: 'left' | 'center' | 'right';
  className?: string;
  showCloseButton?: boolean;
  onCloseClick?: () => void;
  customLogo?: React.ReactNode;
  logoClasses?: string;
}

const Modalheader = ({ children, allowLogo = false, customLogo, contentLocation = 'center', className = '', logoClasses, showCloseButton = false, onCloseClick }: Props) => {
  return (
    <div className={`h-[72px] flex items-start justify-${contentLocation} relative p-1 ${allowLogo ? '' : 'py-4'} border-b border-baseStroke bg-white relative rounded-t-2xl ${className}`}>
      {showCloseButton && (
        <a onClick={onCloseClick} className="bg-transparent absolute top-6 right-4 cursor-pointer">
          <CrossIcon className="w-6 h-6" />{' '}
        </a>
      )}
      <div className="flex gap-x-2 items-center justify-center">
        {/* {allowLogo &&
          (customLogo ? (
            <div className={`h-10 w-10 rounded-full bg-secondary flex justify-center items-center ${logoClasses}`}>{customLogo}</div>
          ) : (
            <img src="/images/logo-dark.png" alt="image" width={45} height={45} />
          ))} */}
        {children}
      </div>
    </div>
  );
};

export default Modalheader;
