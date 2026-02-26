export interface ProviderListTypes {
  providerId: number;
  name: string;
  phoneNumber: string;
  website: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  referralCode: string;
  referralCount: number;
  bannerType: string;
  bannerPicture: string;
  createdAt: string; 
}

export interface CreateProviderTypes {
  providerId?:string | number;
  name:string;
  phoneNumber:string;
  website:string;
  countryId:number | null;
  stateId:number | null;
  cityId:number | null;
  zipCode:string;
  address:string;
  referralCode:string;
  bannerType:string;
  bannerPicture?:string;

}