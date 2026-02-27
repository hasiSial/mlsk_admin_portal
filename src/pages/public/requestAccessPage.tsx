import { customToast } from '@/common/showToast';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Input from '@/components/ui/input/input';
import PhoneNumberInput from '@/components/ui/phone_number/PhoneNumberInput';
import Textarea from '@/components/ui/textarea/Textarea';
import { CreateAccessClientDataRequest } from '@/redux/accessRequest/slice';
import { useAppDispatch } from '@/redux/Hooks';
import { CriticalityTypes } from '@/utils/constants';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { fallbackError } from '@/common/fallbackError';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/sonner';

const RequestAccessPage = () => {
  const { uuid } = useParams();
  const dispatch = useAppDispatch();

  const requestAccessForm = useForm({ mode: 'onChange' });
  const {
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = requestAccessForm;

  const onSubmit = async (data: any) => {
    try {
      let fullPhone = (data.phone || '').replace('+', '');
      let phoneCountryCode = '',
        phone = '';

      if (fullPhone.startsWith('92')) {
        phoneCountryCode = '+92';
        phone = fullPhone.slice(2);
      } else if (fullPhone.startsWith('1')) {
        phoneCountryCode = '+1';
        phone = fullPhone.slice(1);
      } else {
        phoneCountryCode = '+' + fullPhone.slice(0, 2);
        phone = fullPhone.slice(2);
      }

      const payload = {
        uuid: data.uuid,
        name: data.name,
        phoneCountryCode,
        phone: Number(phone),
        criticalityId: Number(data.criticalityId),
        occupation: data.occupation,
        purpose: data.purpose,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      };

      const res = await dispatch(CreateAccessClientDataRequest(payload)).unwrap();

      if (res?.status) {
        requestAccessForm.reset();
        customToast.success(res?.message || 'Access request submitted');
      } else {
        customToast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('error while submitting user access-account api:', error);
      customToast.error('Network error, please try again!');
    }
  };

  useEffect(() => {
    setValue('uuid', uuid || '');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setValue('latitude', pos.coords.latitude);
          setValue('longitude', pos.coords.longitude);
        },
        (err) => console.log('Location error:', err),
        { enableHighAccuracy: true },
      );
    }
  }, [uuid, setValue]);

  return (
    <ErrorBoundary FallbackComponent={fallbackError} onReset={() => window.location.reload()}>
      <Toaster position="top-right" />

      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex justify-center items-start py-4 px-3 sm:px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">Client Request Access</h2>
          <p className="text-textDefault text-center mb-8 sm:mb-10">Fill out the form below to request access to your client data.</p>

          <FormProvider {...requestAccessForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input type="text" placeholder="Enter Name" label="Name" name="name" allowAsterisk rules={{ required: 'Name is required.' }} />

              <Input type="text" placeholder="Enter Occupation" label="Occupation" name="occupation" allowAsterisk rules={{ required: 'Occupation is required.' }} />

              <Dropdown
                label="Criticality of the situation"
                name="criticalityId"
                placeholder="Select"
                data={Object.entries(CriticalityTypes).map(([key, value]) => ({
                  name: key,
                  value: value,
                }))}
                allowAsterisk
                rules={{ required: 'Criticality situation is required.' }}
              />

              <PhoneNumberInput name="phone" label="Phone" allowAsterisk rules={{ required: 'Phone is required' }} />

              <input type="hidden" {...register('latitude')} />
              <input type="hidden" {...register('longitude')} />
              <input type="hidden" {...register('uuid')} />

              <div className="col-span-1 sm:col-span-2">
                <Textarea name="purpose" label="Why do you want to access the data?" placeholder="I want to access my client data history" classNames="min-h-[120px]" />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <Button disabled={isSubmitting} type="submit" className="w-full h-[54px] bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </Button>

              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default RequestAccessPage;
