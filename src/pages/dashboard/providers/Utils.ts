import type { CreateProviderTypes, ProviderListTypes } from "./Types";

export const makeProviderPayload = ({ data }: any): CreateProviderTypes => {
  return {
    providerId:data?.providerId,
    name:data?.name,
    phoneNumber:data?.phoneNumber,
    website:data?.website,
    // countryId:data?.countryId,
    // stateId:data?.stateId,
    // cityId:data?.cityId,
    countryId:1,
    stateId:3584,
    cityId:105132,
    zipCode:data?.zipCode,
    address:data?.address,
    referralCode:data?.referralCode,
    bannerType:data?.bannerType,
    bannerPicture:data?.bannerPicture,
  };
};

export const providerDetailPayload = (data?: ProviderListTypes) => {
  if (!data) return [];

  return [
    { label: 'Phone', value: data.phoneNumber },
    { label: 'Website', value: data.website },
    { label: 'Country', value: data.country },
    { label: 'State', value: data.state },
    { label: 'City', value: data.city },
    { label: 'Zip Code', value: data.zipCode },
    { label: 'Referral Code', value: data.referralCode },
    { label: 'Referral Count', value: data.referralCount },
    { label: 'Address', value: data.address },
  ];
};