import { Badge } from '@/components/ui/badge';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Pagination } from '@/utils/Types';
import { useAppDispatch } from '@/redux/Hooks';
import { getUsersManagementList } from '@/redux/userManagement/slice';
import { capitalizeFirstLetter, useFormatDate } from '@/utils/helpers';
import type { ProviderListTypes } from '@/pages/dashboard/providers/Types';
import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import * as routes from '@/routes/Index';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useProviderActionHook from '@/hooks/useProviderActionHook';
import { useProviderActionManager } from '@/pages/dashboard/providers/providerActionManager';
import { setIsOpenEditProvider, setResetSingleProvider } from '@/redux/providerManagement/slice';

const ProviderTable: FC<{ loading: boolean; records: ProviderListTypes[]; pagination?: Pagination }> = ({ records, pagination = null, loading }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {deleteProviderSweetAlert} = useProviderActionHook();

    const {handleGetSingleProvider} = useProviderActionManager()


    // const providerListColumns = [
    const providerListColumns = [

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ProviderListTypes, b: ProviderListTypes) =>
            (a.name || '').localeCompare(b.name || ''),
            render: (_: any, record: ProviderListTypes) => (
            <span className="text-primary font-medium whitespace-nowrap">
                {capitalizeFirstLetter(record.name)}
            </span>
            ),
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            sorter: (a: ProviderListTypes, b: ProviderListTypes) =>
            (a.state || '').localeCompare(b.state || ''),
            render: (_: any, record: ProviderListTypes) => (
            <span className="whitespace-nowrap">
                {record.state || '-'}
            </span>
            ),
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: (a: ProviderListTypes, b: ProviderListTypes) =>
            (a.city || '').localeCompare(b.city || ''),
            render: (_: any, record: ProviderListTypes) => (
            <span className="whitespace-nowrap">{record.city}</span>
            ),
        },
        {
            title: 'Referral Code',
            dataIndex: 'referralCode',
            key: 'referralCode',
            sorter: (a: ProviderListTypes, b: ProviderListTypes) =>
            (a.referralCode || '').localeCompare(b.referralCode || ''),
            render: (_: any, record: ProviderListTypes) => (
            <span className="whitespace-nowrap font-medium">
                {record.referralCode}
            </span>
            ),
        },
        {
            title: 'Referral Count',
            dataIndex: 'referralCount',
            key: 'referralCount',
            sorter: (a: ProviderListTypes, b: ProviderListTypes) =>
            a.referralCount - b.referralCount,
            render: (_: any, record: ProviderListTypes) => (
            <span className="whitespace-nowrap">
                {record.referralCount}
            </span>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a: ProviderListTypes, b: ProviderListTypes) =>
            (a.createdAt || '').localeCompare(b.createdAt || ''),
            render: (_: any, record: ProviderListTypes) => (
            <span className="whitespace-nowrap">
                {useFormatDate(record.createdAt, 'DD-MM-YYYY')}
            </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: ProviderListTypes, record: ProviderListTypes) => (
                
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    type="button"
                    className="bg-transparent text-untitle-400 hover:bg-transparent shadow-none w-[32px] h-[32px] rounded-full flex items-center justify-center"
                    >
                    <MoreVertical size={18} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[140px] border border-untitle-50 bg-white">
                    <DropdownMenuItem
                        onClick={()=>navigate(routes.ViewProvider(record?.providerId))}
                        className="cursor-pointer bg-transparent hover:bg-primary hover:text-white"
                    >
                        <span><Eye size={14}/></span>
                        <span>View</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="cursor-pointer bg-transparent hover:bg-primary hover:text-white flex items-center gap-2"
                        // onClick={() => {
                        //     if (!record?.providerId) return;

                        //     const id = Number(record.providerId);
                        //     // handleGetSingleProvider(id);
                        //     dispatch(setIsOpenEditProvider(true));
                        // }}
                            onClick={()=> {
                                dispatch(setIsOpenEditProvider(true));
                                handleGetSingleProvider(record?.providerId);
                            }}
                        >
                        <Pencil size={14} />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer bg-transparent hover:bg-primary hover:text-white"
                        onClick={()=>deleteProviderSweetAlert(record?.providerId)}
                    >
                        <span><Trash size={14}/></span>
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            ),
        }

        
    ];

  return (
    <div>
      <Table
        loading={loading}
        columns={providerListColumns}
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

export default ProviderTable;
