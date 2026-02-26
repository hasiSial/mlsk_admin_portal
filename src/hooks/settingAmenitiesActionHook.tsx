import { useCustomAlert } from '@/common/customAlert';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useAppDispatch } from '@/redux/Hooks';
import { deleteAmenityData, getAmenitiesManagementList } from '@/redux/settingManagement/amenitiesManagement/slice';
import { FaRegTrashAlt } from 'react-icons/fa';

const useSettingAmenitiesActionHook = () => {
  const showAlert = useCustomAlert();
  const dispatch = useAppDispatch();

  const deleteAmenity = async (id: number) => {
    showAlert({
      title: 'Delete Amenity',
      description: 'You are about to permanently delete this amenity. This action cannot be undone and the amenity will be removed from all associated listings.',
      confirmText: 'Delete Amenity',
      cancelText: 'Cancel',
      customLogo: <FaRegTrashAlt />,
      //   logoClasses: 'bg--100 text-error',
      onConfirm: async () => {
        try {
          await dispatch(deleteAmenityData(id));
          await dispatch(getAmenitiesManagementList({ page: 1, limit: 10 }));
        } catch (error) {
          console.error('Reject pond failed', error);
        }
      },
      classNames: {
        confirmButton: 'customAlterConfirmButton',
        cancelButton: 'customAlterCancelButton',
      },
    });
  };

  return {
    deleteAmenity,
  };
};

export default useSettingAmenitiesActionHook;
