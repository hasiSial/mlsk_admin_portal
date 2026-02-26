import React from 'react';
interface Props {
  children: React.ReactNode;
  classNames: string;
  closeModal: () => void;
  backDrop?: boolean;
  allowClickOutside?: boolean;
}

const Modal: React.FC<Props> = ({ children, classNames, closeModal, backDrop = true, allowClickOutside = true }) => {
  const handleClickOutside = () => {
    if (allowClickOutside) {
      closeModal();
    }
  };

  return (
    <>
      {backDrop && <div className="fixed inset-0 z-40 bg-black opacity-60" onClick={allowClickOutside ? closeModal : undefined} />}{' '}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className={`relative w-[90%] my-6 mx-auto ${classNames}`}>
          <div className="px-4 border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
