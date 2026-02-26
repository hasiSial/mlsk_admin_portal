import { useCustomAlert } from '@/common/customAlert';
import { useUserActionManager } from '@/pages/dashboard/user/userActionManager';
import { FaUserPlus } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';

const useUserProfileActionHook = () => {
  const showAlert = useCustomAlert();
  const {  handleChangeUserStatus,userLoading } = useUserActionManager();


  const activeInactiveUser = (id: number, title: string, status: string) => {
    const isActive = status === 'active';

    showAlert({
      title: title,
      description: `This action will ${isActive ? 'inactive' : 'active'} the user’s account. Please confirm that you want to proceed this action.`,
      confirmText: isActive ? 'Deactivate Account' : 'Activate Account',
      cancelText: 'No',

      // logo based on status
      customLogo: isActive ? <MdBlock /> : <FaUserPlus />,
      logoClasses: isActive ? '!bg-error-500 text-white' : '!bg-green text-white',

      onConfirm: async () => {
        try {
          await handleChangeUserStatus(id);
        } catch (error) {
          console.error('Status change failed', error);
        }
      },

      classNames: {
        confirmButton: isActive
          ? 'customAlterConfirmButton !bg-error-500'
          : 'customAlterConfirmButton !bg-green',
        cancelButton: 'customAlterCancelButton',
      },
    });
  };


  return {
    activeInactiveUser
  };
};
export default useUserProfileActionHook;
