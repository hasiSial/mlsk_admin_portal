import { customToast } from '@/common/showToast';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import Loader from '@/components/ui/loader/Loader';
import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import ProfileUpload from '@/components/ui/profileUpload';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import Textarea from '@/components/ui/textarea/Textarea';
import { AmenityFormDefaultValues, SetAmenityFormDefaultValues } from '@/forms/amenityForm';
import type { AmenitiesType } from '@/pages/dashboard/settings/types';
import { makeAmenityPayload } from '@/pages/dashboard/settings/utils';
import { useAppDispatch } from '@/redux/Hooks';
import { getAmenitiesManagementList, updateAmenity } from '@/redux/settingManagement/amenitiesManagement/slice';
import type { RootState } from '@/redux/Store';
import { updateSingleAmenityDataHandler } from '@/services/settings/amenities';
import { Plus } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface Props {
  close: () => void;
  data: any;
}

const EditAmenitiesModal: FC<Props> = ({ close, data }) => {
  const [amenityIcon, setAmenityIcon] = useState<{ url: string | null; fullPath: string | null } | null>(null);
  const { singleAmenity, loading } = useSelector((state: RootState) => state.amenitiesManagement);
  // const editForm = useForm();
  const editForm = useForm<any>({
    defaultValues: AmenityFormDefaultValues,
    mode: 'onSubmit',
  });

  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const payload: AmenitiesType = makeAmenityPayload({ data, amenityIcon });

    try {
      await dispatch(
        updateAmenity({
          id: Number(data.id),
          payload,
        }),
      ).unwrap();
      customToast.success('Amenity update successfully');
      editForm.reset();
      close();
      await dispatch(getAmenitiesManagementList({ page: 1, limit: 10 }));
    } catch (error: any) {
      console.error('Error submitting form:', error);
      customToast.error(error?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (singleAmenity) {
      editForm.reset(SetAmenityFormDefaultValues(singleAmenity!));
      setAmenityIcon({ url: singleAmenity?.icon!, fullPath: singleAmenity?.icon! });
    }
  }, [singleAmenity]);
  return (
    <>
      {loading && <Loader />}

      <FormProvider {...editForm}>
        <form onSubmit={editForm.handleSubmit(onSubmit)}>
          <Modal classNames="md:max-w-[50%] md:min-w-[50%] h-fit overflow-x-auto scrollbar-thin" closeModal={close} backDrop>
            <Modalheader logoClasses="bg-error" customLogo={<Plus className="text-white" />} className="p-4" contentLocation="left" showCloseButton onCloseClick={close}>
              <h2 className="ps-4 text-primary text-xl font-normal">Edit Amenity</h2>
            </Modalheader>

            <Modalbody>
              <div className="">
                <ProfileUpload isSubtitle={false} title="Upload Icon for Amenity" labelText="Amenity Icon" onChange={(data) => setAmenityIcon(data)} value={amenityIcon} />
                <Input
                  label="Amenity Name"
                  type="text"
                  classNames=""
                  name="name"
                  placeholder="Enter Amenity Name"
                  allowAsterisk={true}
                  rules={{
                    required: 'Amenity name is required',
                  }}
                />
                <Textarea name="description" label="Amenity Description" placeholder="Enter Amenity Description" />
              </div>
            </Modalbody>

            <Modalfooter>
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={close}
                  type="button"
                  variant="outline"
                  className="border border-textSecondary hover:border-secondary text-secondary roundedDefault w-[146px] h-[44px] hover:bg-secondary hover:text-white px-5 py-3"
                >
                  Close
                </Button>

                <Button
                  type="button"
                  onClick={editForm.handleSubmit(onSubmit)}
                  className="roundedDefault hover:bg-transparent bg-secondary hover:text-secondary border border-secondary hover:border-textSecondary text-white px-5 py-3 w-[200px] h-[44px]"
                >
                  Edit Amenity
                </Button>
              </div>
            </Modalfooter>
          </Modal>
        </form>
      </FormProvider>
    </>
  );
};

export default EditAmenitiesModal;
