import { useCustomAlert } from '@/common/customAlert';
import { deleteClientAccessDocument } from '@/redux/accessRequest/slice';
import { useAppDispatch } from '@/redux/Hooks';
import { MdDelete } from 'react-icons/md';

const useClientAccessDocumentsActionHook = () => {
  const showAlert = useCustomAlert();
  const dispatch = useAppDispatch();

  // Returns a promise that resolves to true/false based on API success
  const deleteDocumentSweetAlert = async (uuid:string,documentSectionUploadId: number): Promise<boolean> => {
    return new Promise((resolve) => {
      showAlert({
        title: 'Delete Document',
        description:
          'This action will permanently delete this document. This action cannot be undone. Please confirm that you want to proceed.',

        confirmText: 'Delete Document',
        cancelText: 'Cancel',

        customLogo: <MdDelete />,
        logoClasses: '!bg-error-500 text-white',

        onConfirm: async () => {
          try {
            await dispatch(deleteClientAccessDocument({uuid,documentSectionUploadId})).unwrap();
            resolve(true); 
          } catch (error) {
            console.error('Delete document failed', error);
            resolve(false); 
          }
        },

        onCancel: () => {
          resolve(false);
        },

        classNames: {
          confirmButton: 'customAlterConfirmButton !bg-error-500',
          cancelButton: 'customAlterCancelButton',
        },
      });
    });
  };

  return {
    deleteDocumentSweetAlert,
  };
};

export default useClientAccessDocumentsActionHook;