import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface Props {
  onChange: (filters: any) => void;
}

const UserFilter = ({ onChange }: Props) => {
  const userFilterForm = useForm();
  const [filters, setFilters] = useState<any>({
    status: null,
    role: null,
    search: '',
    startDate: '',
    endDate: '',
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const delay = setTimeout(() => {
      onChange({
        status: filters.status === '' ? null : filters.status,
        search: filters.search,
        role: filters.role === '' ? null : filters.role,
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
      });
    }, 400);

    return () => clearTimeout(delay);
  }, [filters]);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setFilters((prev: any) => ({
      ...prev,
      startDate: start ? format(start, 'yyyy-MM-dd') : null,
      endDate: end ? format(end, 'yyyy-MM-dd') : null,
    }));
  };

  return (
    <FormProvider {...userFilterForm}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
        {/* Title & Description */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl lg:text-2xl font-bold text-black">User Management</h2>
          <p className="text-untitle-400 font-medium text-base lg:text-xl">
            Here you can add, edit, and manage user accounts.
          </p>
        </div>

        {/* Filters & Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
          {/* Search Input */}
          <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
            <Input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search Here"
              icon={<Icon icon="/icons/search.svg" className="text-primary" stroke fill={false} />}
              iconPosition="right"
              className="w-full h-[44px] rounded-lg border border-input placeholder:text-textSecondary"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <Button type="button" className="h-[44px]">
              Push Notification
            </Button>
            <Button disabled type="button" className="h-[44px]">
              Send SMS
            </Button>
            <Button disabled type="button" className="h-[44px]">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default UserFilter;
