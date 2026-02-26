import { Button } from '@/components/ui/button';
import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useEffect, useState, type FC } from 'react';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import { FormProvider, useForm } from 'react-hook-form';
import { customToast } from '@/common/showToast';
import { useAppDispatch } from '@/redux/Hooks';
import ProviderForm from './providerForm';
import { ProviderManagementFormDefaultValues } from '@/forms/providerForm';
import type { CreateProviderTypes } from '@/pages/dashboard/providers/Types';
import { makeProviderPayload } from '@/pages/dashboard/providers/Utils';
import { CreateNewProvider, getProvidersManagementList } from '@/redux/providerManagement/slice';

interface Props {
  close: () => void;
}

const AddNewProviderModal: FC<Props> = ({close}) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<any>({
    defaultValues: ProviderManagementFormDefaultValues,
    mode: 'onSubmit',
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
    const payload: CreateProviderTypes = makeProviderPayload({ data });

    await dispatch(CreateNewProvider(payload)).unwrap();
    customToast.success('Provider created successfully');
    methods.reset();

    close();
    dispatch(getProvidersManagementList({page:1,limit:10}))
    // navigate(routes.ManageUsers());
    } catch (error: any) {
    console.error('Error submitting form:', error);
    // customToast.error(error?.message || 'Something went wrong');
    } finally {
    setIsSubmitting(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <Modal classNames="md:max-w-[48%] md:min-w-[48%] h-fit overflow-x-auto scrollbar-thin" closeModal={close} backDrop>
          <Modalheader
            className="flex flex-col"
            showCloseButton
            onCloseClick={close}
          >
            <h2 className="block text-primary text-xl font-semibold">Add Provider</h2>
            {/* <p className="block text-paragraph">Set default notification preferences (user can change later)</p> */}
          </Modalheader>

            <Modalbody className='p-0 m-0'>
                <ProviderForm />
            </Modalbody>

          <Modalfooter>
            <div className="w-full flex items-center border-t border-baseStroke gap-3">
              <Button
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                className="w-full h-[44px]"
              >
                Add Provider
              </Button>
            </div>
          </Modalfooter>
        </Modal>
      </form>
    </FormProvider>
  );
};

export default AddNewProviderModal;
