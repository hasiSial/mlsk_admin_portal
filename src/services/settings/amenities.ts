import api from '../Api';

export const getAmenitiesDataHandler = async (page: number, limit: number) => {
  return api.get('/admin/amenity', {
    params: {
      page,
      limit,
      //   search,
    },
  });
};

export const createNewAmenityDataHandler = async (data: any) => {
  return api.post('/admin/amenity', data);
};

export const getSingleAmenityDataHandler = async (pondId: number) => {
  return api.get(`/admin/amenity/${pondId}`);
};

export const updateSingleAmenityDataHandler = async (id: number, data: any) => {
  return api.put(`/admin/amenity/${id}`, data);
};

export const deleteAmenityHandler = async (id: number) => {
  return api.delete(`/admin/amenity/${id}`);
};
