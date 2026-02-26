import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/Store';
import { useProviderActionManager } from './providerActionManager';
import ProviderTable from '@/components/features/providers/providerTable';
import ProviderFilter from '@/components/features/providers/providerFilters';
import AddNewProviderModal from '@/components/modals/providers/addNewProviderModal';
import { useAppDispatch } from '@/redux/Hooks';
import { setIsOpenAddNewProvider, setIsOpenEditProvider } from '@/redux/providerManagement/slice';
import EditProviderModal from '@/components/modals/providers/editProviderModal';

const ProviderPage = () => {
    const dispatch = useAppDispatch()
    const { handleGetProvidersList } = useProviderActionManager();
    const { providers,singleLoading, loading, pagination, isOpenAddNewProvider,isOpenEditProvider,singleProvider} = useSelector((state: RootState) => state.providerManagement);

    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        status: '',
        search: '',
    });

    useEffect(() => {
        handleGetProvidersList({
        page: 1,
        limit: 10,
        search: filters.search || undefined,
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
                <ProviderFilter onChange={onFiltersChange} />
                </div>
                {/* table */}
                <div className="col-span-2">
                    <ProviderTable loading={loading} records={providers ?? []} pagination={pagination} />
                </div>
            </div>
            {isOpenAddNewProvider &&(
                <AddNewProviderModal close={()=>dispatch(setIsOpenAddNewProvider(false))}/>
            )}
            {isOpenEditProvider &&(
                <EditProviderModal close={()=>dispatch(setIsOpenEditProvider(false))} record={singleProvider} loading={singleLoading} />
            )}
        </div>
    );
};

export default ProviderPage;
