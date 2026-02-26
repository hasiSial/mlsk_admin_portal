import api from '../Api';

export const getProvidersDataHandler = async (page: number, limit: number, search?: string) => {
  return api.get('/admin/providers', {
    params: {
      page,
      limit,
      search
    },
  });
};

export const createNewProviderHandler = async (data: any) => {
  return api.post('/admin/providers', data);
};

export const getSingleProviderHandler = async (id: number) => {
  return api.get(`/admin/providers/${id}`);
};

export const updateProviderHandler = async (id: number, data: any) => {
  return api.patch(`/admin/providers/${id}`, data);
};


export const getUserByProviderCount = async (providerId: number) => {
  return api.get(`/admin/providers/${providerId}/users`);
};

export const deleteProviderHandler = async (providerId: number) => {
  return api.delete(`/admin/providers/${providerId}`);
};

