import { useAppDispatch } from '@/redux/Hooks';
import type { Pagination } from '@/utils/Types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProviderRecord, getProvidersManagementList, getSingleProviderRecord, getUsersByProviderCountRecords } from '@/redux/providerManagement/slice';

export const useProviderActionManager = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState();
  const dispatch = useAppDispatch();
  

  const [providerLoading, setProviderLoading] = useState(false);
  const [userPagination, setUserPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  //get classes list
  const handleGetProvidersList = (filters: { page: number; limit: number; search?: string;}) => {
    setProviderLoading(true);

    return dispatch(getProvidersManagementList(filters))
      .unwrap()
      .then((res: any) => {
        setProviders(res?.users);
        setUserPagination(res?.meta);
      })
      .catch(() => {})
      .finally(() => {
        setProviderLoading(false);
      });
  };

  const handleGetSingleProvider = (id:number) => {
    setProviderLoading(true);

    return dispatch(getSingleProviderRecord(id))
      .unwrap()
      .then((res: any) => {
      })
      .catch(() => {})
      .finally(() => {
        setProviderLoading(false);
      });
  };

  const handleGetUserByProviderCound = (id:number) => {
    return dispatch(getUsersByProviderCountRecords(id))
      .unwrap()
      .then((res: any) => {
      })
      .catch(() => {});
  };

  const handleDeleteProviderRecord = (id:number) => {
    return dispatch(deleteProviderRecord(id))
      .unwrap()
      .then((res: any) => {
        handleGetProvidersList({page:1,limit:10})
      })
      .catch(() => {});
  };

  //



  return {
    providers,
    providerLoading,
    userPagination,
    handleGetUserByProviderCound,
    handleGetProvidersList,
    handleGetSingleProvider,
    handleDeleteProviderRecord

  };
};
