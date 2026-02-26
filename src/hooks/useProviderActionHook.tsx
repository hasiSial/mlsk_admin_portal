import { useCustomAlert } from '@/common/customAlert';
import { useProviderActionManager } from '@/pages/dashboard/providers/providerActionManager';
import { MdDelete } from 'react-icons/md';

const useProviderActionHook = () => {
  const showAlert = useCustomAlert();
  const {  handleDeleteProviderRecord } = useProviderActionManager();


  const deleteProviderSweetAlert = (id: number) => {
    showAlert({
        title: 'Delete Provider Record',
        description:
        'This action will permanently delete this provider. This action cannot be undone. Please confirm that you want to proceed.',

        confirmText: 'Delete Provider',
        cancelText: 'Cancel',

        customLogo: <MdDelete />,
        logoClasses: '!bg-error-500 text-white',

        onConfirm: async () => {
        try {
            await handleDeleteProviderRecord(id);
        } catch (error) {
            console.error('Delete provider failed', error);
        }
        },

        classNames: {
        confirmButton: 'customAlterConfirmButton !bg-error-500',
        cancelButton: 'customAlterCancelButton',
        },
    });
    };

  return {
    deleteProviderSweetAlert
  };
};
export default useProviderActionHook;
