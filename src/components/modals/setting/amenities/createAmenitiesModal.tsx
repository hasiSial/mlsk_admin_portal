import { customToast } from '@/common/showToast';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/input';
import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import ProfileUpload from '@/components/ui/profileUpload';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import Textarea from '@/components/ui/textarea/Textarea';
import type { AmenitiesType } from '@/pages/dashboard/settings/types';
import { makeAmenityPayload } from '@/pages/dashboard/settings/utils';
import { useAppDispatch } from '@/redux/Hooks';
import { CreateNewAmenity, getAmenitiesManagementList } from '@/redux/settingManagement/amenitiesManagement/slice';
import { useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { Plus } from 'lucide-react';

interface Props {
  close: () => void;
}

const CreateAmenitiesModal: FC<Props> = ({ close }) => {
  const [amenityIcon, setAmenityIcon] = useState<{ url: string | null; fullPath: string | null } | null>(null);
  const createForm = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const payload: AmenitiesType = makeAmenityPayload({ data, amenityIcon });

    try {
      await dispatch(CreateNewAmenity(payload));

      customToast.success('Amenity created successfully');
      createForm.reset();
      close();
      await dispatch(getAmenitiesManagementList({ page: 1, limit: 10 }));
    } catch (error: any) {
      console.error('Error submitting form:', error);
      customToast.error(error?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...createForm}>
      <form onSubmit={createForm.handleSubmit(onSubmit)}>
        <Modal classNames="md:max-w-[50%] md:min-w-[50%] h-fit overflow-x-auto scrollbar-thin" closeModal={close} backDrop>
          <Modalheader logoClasses="bg-error" customLogo={<Plus className="text-white" />} className="p-4" contentLocation="left" showCloseButton onCloseClick={close}>
            <h2 className="ps-4 text-primary text-xl font-normal">Add a New Amenity</h2>
          </Modalheader>

          <Modalbody>
            <div className="">
              <ProfileUpload
                isAmenityIcon={true}
                isSubtitle={false}
                title="Upload Icon for Amenity"
                labelText="Amenity Icon"
                onChange={(data) => setAmenityIcon(data)}
                value={amenityIcon}
              />
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
                onClick={createForm.handleSubmit(onSubmit)}
                className="roundedDefault hover:bg-transparent bg-secondary hover:text-secondary border border-secondary hover:border-textSecondary text-white px-5 py-3 w-[200px] h-[44px]"
              >
                Add Amenity
              </Button>
            </div>
          </Modalfooter>
        </Modal>
      </form>
    </FormProvider>
  );
};

export default CreateAmenitiesModal;
