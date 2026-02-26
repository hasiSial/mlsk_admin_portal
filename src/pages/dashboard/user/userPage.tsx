import UserTable from '@/components/features/user/userTable';
import { useEffect, useState } from 'react';
import UserFilter from '@/components/features/user/userFilters';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { useUserActionManager } from './userActionManager';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/Store';

const UserPage = () => {
  const { handleGetUsersList } = useUserActionManager();
  const { users, loading, pagination } = useSelector((state: RootState) => state.userManagement);

  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });

  useEffect(() => {
    handleGetUsersList({
      page: 1,
      limit: 10,
      search: filters.search || undefined,
      status: filters.status === '' ? undefined : filters.status,
    });
  }, [filters]);

  const onFiltersChange = (updatedFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 space-y-6 bg-white p-3">
        {/* filter */}
        <div className="col-span-2">
          <UserFilter onChange={onFiltersChange} />
        </div>
        {/* table */}
        <div className="col-span-2">
          <UserTable loading={loading} records={users ?? []} pagination={pagination} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
