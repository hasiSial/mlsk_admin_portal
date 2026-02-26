import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useAppDispatch } from '@/redux/Hooks';
import { setIsOpenAddNewProvider } from '@/redux/providerManagement/slice';

interface Props {
  onChange: (filters: any) => void;
}

const ProviderFilter = ({ onChange }: Props) => {
    const dispatch = useAppDispatch()
     const userFilterForm = useForm();
    const [filters, setFilters] = useState<any>({
    search: '',
    });
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delay = setTimeout(() => {
        onChange({
            search: filters.search,
        });
        }, 400);

        return () => clearTimeout(delay);
    }, [filters]);


  return (
    <FormProvider {...userFilterForm}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
            {/* Title Section */}
            <div className="flex flex-col gap-1">
            <h2 className="text-xl lg:text-2xl font-bold text-black">
                Providers
            </h2>
            <p className="text-untitle-400 font-medium text-base lg:text-lg">
                Manage providers and monitor referral performance.
            </p>
            </div>

            {/* Search + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 w-full">
                <div className="w-full sm:w-[280px]">
                <Input
                    value={filters.search}
                    onChange={(e) =>
                    setFilters((prev:any) => ({
                        ...prev,
                        search: e.target.value,
                    }))
                    }
                    placeholder="Search providers..."
                    icon={
                    <Icon
                        icon="/icons/search.svg"
                        className="text-primary"
                        stroke
                        fill={false}
                    />
                    }
                    iconPosition="right"
                    className="h-[44px] rounded-lg border border-input placeholder:text-textSecondary"
                />
                </div>

                <Button onClick={()=>dispatch(setIsOpenAddNewProvider(true))} type="button" className="h-[44px]">
                   Add New Providers
                </Button>
            </div>
        </div>
    </FormProvider>
  );
};

export default ProviderFilter;
