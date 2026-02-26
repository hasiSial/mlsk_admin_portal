import { Button } from '@/components/ui/button';
import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { makeUserNotificationPayload, userNotifications } from '@/pages/dashboard/user/Utils';
import { useEffect, type FC } from 'react';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import { FormProvider, useForm } from 'react-hook-form';
import { SetUserNotificationFormDefaultValues, UserNotificationFormDefaultValues } from '@/forms/userManagement';
import { customToast } from '@/common/showToast';
import { useAppDispatch } from '@/redux/Hooks';

interface Props {
  close: () => void;
  data?: any;
  userId: string | undefined;
}

const ViewUserNotificationModal: FC<Props> = ({ userId, close, data = null }) => {
  const dispatch = useAppDispatch();
  const updateNotificationForm = useForm<any>({
    defaultValues: UserNotificationFormDefaultValues,
    mode: 'onSubmit',
  });

  const { reset } = updateNotificationForm;
  useEffect(() => {
    if (data) {
      reset(SetUserNotificationFormDefaultValues(data));
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    try {
      const payload: any = makeUserNotificationPayload({ data });

      // await dispatch(updateUserNotificationData({ id: Number(userId), payload })).unwrap();
      customToast.success('User notification updated successfully');
      close();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      // customToast.error(error?.message || 'Something went wrong');
    }
  };
  return (
    <FormProvider {...updateNotificationForm}>
      <form onSubmit={updateNotificationForm.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <Modal classNames="md:max-w-[60%] md:min-w-[60%] h-fit overflow-x-auto scrollbar-thin" closeModal={close} backDrop>
          <Modalheader
            logoClasses="bg-error"
            customLogo={<Icon icon="/icons/ring.svg" className="text-white" />}
            className="p-4 flex flex-col"
            contentLocation="left"
            showCloseButton
            onCloseClick={close}
          >
            <h2 className="block ps-4 text-primary text-xl font-normal">Notification Preferences</h2>
            {/* <p className="block text-paragraph">Set default notification preferences (user can change later)</p> */}
          </Modalheader>

          <Modalbody>
            <div className="grid grid-cols-2 gap-4 justify-start">
              {userNotifications.map((item) => (
                <div key={item?.name} className="col-span-2 lg:col-span-1">
                  <Checkbox key={item?.name} name={item?.name} label={item?.label} />
                </div>
              ))}
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
                onClick={updateNotificationForm.handleSubmit(onSubmit)}
                className="roundedDefault hover:bg-transparent bg-secondary hover:text-secondary border border-secondary hover:border-textSecondary text-white px-5 py-3 w-[200px] h-[44px]"
              >
                Update
              </Button>
            </div>
          </Modalfooter>
        </Modal>
      </form>
    </FormProvider>
  );
};

export default ViewUserNotificationModal;
