import { Badge } from '@/components/ui/badge';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Pagination } from '@/utils/Types';
import { useAppDispatch } from '@/redux/Hooks';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useCustomAlert } from '@/common/customAlert';
import type { UserListPayloadTypes } from '@/pages/dashboard/user/Types';
import {  getUserStatusBadge } from '@/pages/dashboard/user/Utils';
import { getUsersManagementList } from '@/redux/userManagement/slice';
import { capitalizeFirstLetter, useFormatDate } from '@/utils/helpers';
import useUserProfileActionHook from '@/hooks/useUserProfileActionHook';
import { Eye } from 'lucide-react';
import * as routes from '@/routes/Index';

const UserTable: FC<{ loading: boolean; records: UserListPayloadTypes[]; pagination?: Pagination }> = ({ records, pagination = null, loading }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showAlert = useCustomAlert();
  const {activeInactiveUser} = useUserProfileActionHook()

  const userListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: UserListPayloadTypes, b: UserListPayloadTypes) => (a.name || '').localeCompare(b.name || ''),
      render: (_: any, record: UserListPayloadTypes) => <span className="text-primary font-medium whitespace-nowrap">{capitalizeFirstLetter(record.name)}</span>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a: UserListPayloadTypes, b: UserListPayloadTypes) => (a.phone || '').localeCompare(b.phone || ''),
      render: (_: any, record: UserListPayloadTypes) => <span className="whitespace-nowrap">{record.phone}</span>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: UserListPayloadTypes, b: UserListPayloadTypes) => (a.email || '').localeCompare(b.email || ''),
      render: (_: any, record: UserListPayloadTypes) => <span className="whitespace-nowrap">{record.email ?? 'N/A'}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: UserListPayloadTypes, b: UserListPayloadTypes) => a.status.localeCompare(b.status),
      render: (_: any, record: UserListPayloadTypes) => <Badge className={`shadow-none ${getUserStatusBadge(record.status)}`}>{capitalizeFirstLetter(record.status)}</Badge>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: UserListPayloadTypes, b: UserListPayloadTypes) => (a.createdAt || '').localeCompare(b.createdAt || ''),
      render: (_: any, record: UserListPayloadTypes) => <span className="whitespace-nowrap">{useFormatDate(record.createdAt, 'DD-MM-YYYY')}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: UserListPayloadTypes, record: UserListPayloadTypes) => (
        <div className='flex items-center justify-center gap-4'>
          <Button
            type="button"
            onClick={() =>
              activeInactiveUser(
                record?.userId,
                `${capitalizeFirstLetter(record?.status) === 'Active' ? 'Deactivate' : 'Activate'} User`,
                record?.status
              )
            }
            className={`bg-transparent hover:bg-transparent shadow-none w-[32px] h-[32px] rounded-full flex items-center justify-center font-semibold ${
              capitalizeFirstLetter(record.status) === 'Active' ? 'text-green' : 'text-red'
            }`}
          >
            {capitalizeFirstLetter(record.status)}
          </Button>
          <Button type='button' onClick={()=>navigate(routes.ManageViewSingleUser(record?.userId))} className='cursor-pointer'><Eye size={16} /></Button>
        </div>
        
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={userListColumns}
        dataSource={records}
        rowKey="id"
        pagination={
          pagination
            ? {
                totalItems: +pagination.total,
                totalPages: +pagination.totalPages,
                itemCount: records.length,
                itemsPerPage: +pagination.limit,
                currentPage: +pagination.page,

                setitemsPerPage: (val: number) => {
                  dispatch(getUsersManagementList({ page: 1, limit: val }));
                },
                onPageChange: (page: number) => {
                  dispatch(getUsersManagementList({ page, limit: pagination.limit }));
                },
              }
            : undefined
        }
      />
    </div>
  );
};

export default UserTable;
