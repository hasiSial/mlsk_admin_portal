import api from '../Api';

export const getUsersDataHandler = async (page: number, limit: number, search?: string, status?: string) => {
  return api.get('/admin/user-management', {
    params: {
      page,
      limit,
      search,
      status
    },
  });
};


export const changeStatusHandler = async (id: number) => {
  return api.patch(`/admin/user-management/${id}/status`);
};

export const getSingleUserHandler = async (id: number) => {
  return api.get(`/admin/user-management/${id}/details`);
};


