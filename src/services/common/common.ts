import api from '../Api';

// Common File Upload
export const commonFileUploadHandler = async (data: any) => {
  return api.post('upload/single', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCountriesHandler = async () => {
  return api.get('/shared/location/countries');
};

export const getStateHandler = async (countryIso: number) => {
  return api.get(`shared/location/states/${Number(countryIso)}`);
};

export const getCityHandler = async (stateIso: string) => {
  return api.get(`/shared/location/cities/${stateIso}`);
};
