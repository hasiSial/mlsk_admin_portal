import type { CreateProviderTypes } from "@/pages/dashboard/providers/Types";

export const ProviderManagementFormDefaultValues: CreateProviderTypes = {
    name:'',
    phoneNumber:'',
    website:'',
    countryId:null,
    stateId:null,
    cityId:null,
    zipCode:'',
    address:'',
    referralCode:'',
    bannerType:'',
    bannerPicture:''

};

export const SetProviderManagementFormDefaultValues = (data: any) => {
  return {
    providerId: data?.providerId ?? null,
    name: data?.name ?? '',
    phoneNumber: data?.phoneNumber ?? '',
    website: data?.website ?? '',
    countryId: data?.countryId ?? '',
    stateId: data?.stateId ?? '',
    cityId: data?.cityId ?? '',
    zipCode: data?.zipCode ?? '',
    address: data?.address ?? '',
    referralCode: data?.referralCode ?? '',
    bannerType: data?.bannerType ?? '',
  };
};
