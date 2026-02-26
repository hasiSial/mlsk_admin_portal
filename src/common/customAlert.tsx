import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { createContext, useContext, useState, type ReactNode } from 'react';

type AlertDialogOptions = {
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  customLogo?: ReactNode;
  logoClasses?: string;
  classNames?: {
    content?: string;
    title?: string;
    description?: string;
    cancelButton?: string;
    confirmButton?: string;
  };
};

type AlertDialogContextType = {
  showDialog: (options: AlertDialogOptions) => void;
};

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

export const useCustomAlert = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('useCustomAlert must be used within AlertDialogProvider');
  }
  return context.showDialog;
};

export const AlertDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AlertDialogOptions | null>(null);

  const showDialog = (opts: AlertDialogOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleConfirm = () => {
    options?.onConfirm?.();
    setOpen(false);
  };

  const handleCancel = () => {
    options?.onCancel?.();
    setOpen(false);
  };

  return (
    <AlertDialogContext.Provider value={{ showDialog }}>
      {children}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogOverlay className="bg-black opacity-60" />
        <AlertDialogContent className={cn('w-[90%] bg-white border border-input p-0 !rounded-2xl', options?.classNames?.content)}>
          <AlertDialogHeader className="rounded-2xl bg-input">
            <AlertDialogTitle className={options?.classNames?.title}>
              <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-2">
                <div className="gap-2 flex items-center">
                  {options?.customLogo && (
                    <div className={`bg-secondary text-white h-10 w-10 flex justify-center items-center rounded-full ${options?.logoClasses}`}>{options.customLogo}</div>
                  )}
                  <h2 className="text-primary text-xl font-normal">{options?.title}</h2>
                </div>
                <span onClick={handleCancel} className="cursor-pointer w-5 h-5 py-2 flex items-center justify-center rounded-full text-text-800">
                  <X className="text-text-800" size={24} />
                </span>
              </div>
            </AlertDialogTitle>
            {options?.description && (
              <AlertDialogDescription className={cn('text-textSecondary bg-white text-base font-normal text-center px-4 pt-4', options?.classNames?.description)}>
                {options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="rounded-b-2xl px-4 bg-input py-4 flex items-center">
            <AlertDialogCancel className={options?.classNames?.cancelButton} onClick={handleCancel}>
              {options?.cancelText || 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction className={options?.classNames?.confirmButton} onClick={handleConfirm}>
              {options?.confirmText || 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
};
