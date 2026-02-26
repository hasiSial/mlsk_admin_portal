import type { AmenitiesType } from '@/pages/dashboard/settings/types';

export const AmenityFormDefaultValues: AmenitiesType = {
  name: '',
  description: '',
  icon: '',
};

export const SetAmenityFormDefaultValues = (data: AmenitiesType) => {
  return {
    id: data?.amenityId,
    name: data?.name,
    icon: data?.icon,
    description: data?.description,
  };
};
