import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DateRange, type RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, startOfToday, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Button } from './button';
import RequiredAsterisk from './requiredAsterisk';
import { CrossIcon } from '@/utils/icons';

interface DateRangePickerProps {
  label: string;
  className?: string;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  allowAsterisk?: boolean;
  labelClassName?: string;
  position?: 'left' | 'right';
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ label, className = '', labelClassName = '', onDateChange, allowAsterisk = false, position = 'left' }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  // handle date selection
  const handleSelect = (ranges: RangeKeyDict) => {
    const startDate = ranges.selection.startDate ?? null;
    const endDate = ranges.selection.startDate === ranges.selection.endDate ? null : (ranges.selection.endDate ?? null);

    setDateRange({ startDate, endDate });
    onDateChange(startDate, endDate);
  };

  // handle reset
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange({ startDate: null, endDate: null });
    onDateChange(null, null);
    setShowCalendar(false);
  };

  // quick filters
  const handleFilter = (filter: string) => {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (filter) {
      case 'today':
        startDate = endDate = startOfToday();
        break;
      case 'yesterday':
        startDate = endDate = subDays(startOfToday(), 1);
        break;
      case 'thisWeek':
        startDate = startOfWeek(new Date());
        endDate = endOfWeek(new Date());
        break;
      case 'lastWeek':
        startDate = startOfWeek(subDays(new Date(), 7));
        endDate = endOfWeek(subDays(new Date(), 7));
        break;
      case 'thisMonth':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case 'lastMonth':
        startDate = startOfMonth(subMonths(new Date(), 1));
        endDate = endOfMonth(subMonths(new Date(), 1));
        break;
    }

    setDateRange({ startDate, endDate });
    onDateChange(startDate, endDate);
  };

  // floating calendar content
  const calendarContent = (
    <div
      ref={calendarRef}
      className="fixed z-[9999] shadow-xl bg-white p-3 rounded-2xl flex border border-text-500"
      // style={{
      //   top: triggerRef.current ? triggerRef.current.getBoundingClientRect().bottom + 8 : 100,
      //   left: triggerRef.current ? triggerRef.current.getBoundingClientRect().left : 100,
      // }}
      style={{
        top: triggerRef.current ? triggerRef.current.getBoundingClientRect().bottom + 8 : 100,
        left: position === 'left' ? (triggerRef.current ? triggerRef.current.getBoundingClientRect().left : 100) : undefined,
        right: position === 'right' ? window.innerWidth - (triggerRef.current ? triggerRef.current.getBoundingClientRect().right : 100) : undefined,
      }}
    >
      {/* Quick filters */}
      <div className="w-[120px] flex flex-col gap-2 pr-3 border-r border-gray-100">
        {['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'lastMonth'].map((filter) => (
          <button
            key={filter}
            className="rounded-lg text-sm font-semibold text-gray-700 hover:text-primary-700 hover:bg-primary-25 w-full h-[38px] transition-colors"
            onClick={() => handleFilter(filter)}
          >
            {filter.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Date Picker */}
      <div className="ml-4">
        <DateRange
          ranges={[
            {
              startDate: dateRange.startDate || new Date(),
              endDate: dateRange.endDate || dateRange.startDate || new Date(),
              key: 'selection',
            },
          ]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
          rangeColors={['#19354d']}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      {/* Input-like field */}
      <div className="mt-2 relative">
        <div
          ref={triggerRef}
          onClick={() => setShowCalendar(!showCalendar)}
          className={`peer flex items-center justify-between w-full h-[56px] px-4 rounded-full border border-text-500 bg-transparent cursor-pointer text-text-25 placeholder:text-text-25 placeholder:font-medium
            hover:border-primary-700 focus-within:border-textLight-975 hover:placeholder:text-textLight-975 focus-within:placeholder:text-textLight-975
            sm:text-sm sm:leading-6 ${className}`}
        >
          <span className="">
            {dateRange.startDate && dateRange.endDate ? (
              `${format(dateRange.startDate, 'MM/dd/yyyy')} - ${format(dateRange.endDate, 'MM/dd/yyyy')}`
            ) : dateRange.startDate ? (
              `${format(dateRange.startDate, 'MM/dd/yyyy')}`
            ) : (
              <span className="text-text-25">Select date range</span>
            )}
          </span>

          <span className="flex items-center gap-2 text-text-25">
            {dateRange.startDate && (
              <Button className="p-1 h-fit hover:bg-error-100" variant={'ghost'} onClick={handleReset}>
                <CrossIcon size={18} />
              </Button>
            )}
            <Calendar className="w-5 h-5" />
          </span>
        </div>

        {/* Floating label */}
        <label
          className={`
            absolute -top-3 left-4 text-sm bg-text-850 px-1 transition-colors duration-200
            text-text-25
            peer-hover:text-primary-700
            peer-focus:text-textLight-975
            
            ${labelClassName}
          `}
        >
          {label}
          {allowAsterisk && (
            <span className="ms-[2px]">
              <RequiredAsterisk />
            </span>
          )}
        </label>
      </div>

      {/* Calendar popup */}
      {showCalendar && createPortal(calendarContent, document.body)}
    </div>
  );
};

export default DateRangePicker;
