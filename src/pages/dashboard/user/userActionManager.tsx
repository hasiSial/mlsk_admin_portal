import { useAppDispatch } from '@/redux/Hooks';
import {
  changeUserStatus,
  getUsersManagementList,
} from '@/redux/userManagement/slice';
import type { Pagination } from '@/utils/Types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SingleUserResponse } from './Types';
import { customToast } from '@/common/showToast';

export const useUserActionManager = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const dispatch = useAppDispatch();
  

  const [userLoading, setUserLoading] = useState(false);
  const [userPagination, setUserPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  //get classes list
  const handleGetUsersList = (filters: { page: number; limit: number; search?: string; status?: string; role?: string; startDate?: Date; endDate?: Date }) => {
    setUserLoading(true);

    return dispatch(getUsersManagementList(filters))
      .unwrap()
      .then((res: any) => {
        setUsers(res?.users);
        setUserPagination(res?.meta);
      })
      .catch(() => {})
      .finally(() => {
        setUserLoading(false);
      });
  };

  const handleChangeUserStatus = (id:number) => {
    setUserLoading(true);

    return dispatch(changeUserStatus(id))
      .unwrap()
      .then((res: any) => {
        customToast.success('User status updated successfully')
        handleGetUsersList({page:1,limit:10})
      })
      .catch(() => {})
      .finally(() => {
        setUserLoading(false);
      });
  };



  return {
    users,
    userLoading,
    userPagination,
    handleGetUsersList,
    handleChangeUserStatus

  };
};
