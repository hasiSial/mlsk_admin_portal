// import React, { type FC, useMemo, useState, useCallback, useEffect } from 'react';
// import clsx from 'clsx';
// import Loader from '../loader/Loader';
// import { Checkbox } from '../checkbox';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select';
// import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
// import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@/utils/icons';

// interface ColumnType<T> {
//   title: React.ReactNode;
//   dataIndex: keyof T;
//   key: string;
//   sorter?: (a: T, b: T) => number;
//   render?: (value: any, record: T, index: number) => React.ReactNode;
// }

// interface RowSelection<T> {
//   selectedRowKeys: React.Key[];
//   onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
// }

// interface TableProps<T> {
//   columns: ColumnType<T>[];
//   dataSource: T[];
//   loading?: boolean;
//   tableStyle?: string;
//   headerStyle?: string;
//   rowKey: keyof T;
//   pagination?: {
//     totalItems: number;
//     totalPages: number;
//     itemCount: number;
//     itemsPerPage: number;
//     currentPage: number;
//     setitemsPerPage?: (size: number) => void;
//     onPageChange: (page: number) => void;
//   };
//   search?: string;
//   rowSelection?: RowSelection<T>;
// }

// const Spinner = () => <div className="w-8 h-8 rounded-full animate-spin border-2 border-solid border-primary border-t-transparent"></div>;

// const Table: FC<TableProps<any>> = ({ columns, dataSource, loading = false, tableStyle = '', headerStyle = '', rowKey, pagination, search = '', rowSelection }) => {
//   const [sortInfo, setSortInfo] = useState<{
//     key: string;
//     order: 'asc' | 'desc' | null;
//   }>({ key: '', order: null });
//   const [currentPageSelections, setCurrentPageSelections] = useState<React.Key[]>([]);
//   const filteredData = useMemo(() => {
//     let filtered = dataSource ? [...dataSource] : [];

//     if (search) {
//       filtered = dataSource?.filter((item) => columns.some((col) => String(item[col.dataIndex]).toLowerCase().includes(search.toLowerCase())));
//     }

//     if (sortInfo.order && sortInfo.key) {
//       const column = columns.find((col) => col.key === sortInfo.key);
//       if (column?.sorter) {
//         filtered.sort((a, b) => (sortInfo.order === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)));
//       }
//     }

//     return filtered;
//   }, [dataSource, columns, search, sortInfo]);

//   useEffect(() => {
//     setCurrentPageSelections([]);
//     rowSelection?.onChange([], []);
//   }, [pagination?.currentPage]);

//   const handleSort = useCallback((key: string) => {
//     setSortInfo((prev) => ({
//       key,
//       order: prev.order === 'asc' ? 'desc' : 'asc',
//     }));
//   }, []);

//   const renderSorterIcon = (fieldName: string) => {
//     if (sortInfo.key !== fieldName) {
//       return (
//         <div className="ml-2">
//           <span>
//             <ChevronUpDownIcon className="hover:text-white p-0 cursor-pointer" size={16} />
//           </span>
//         </div>
//       );
//     }
//     return sortInfo.order === 'asc' ? (
//       <div className="ml-2">
//         <span>
//           <ChevronDownIcon className="hover:text-white p-0 cursor-pointer" size={16} />
//         </span>{' '}
//       </div>
//     ) : (
//       <div className="ml-2 flex flex-col gap-0 items-center leading-none">
//         <span>
//           <ChevronUpIcon className=" hover:text-white p-0 cursor-pointer" size={16} />
//         </span>
//       </div>
//     );
//   };

//   const renderPageNumbers = () => {
//     const currentPage = pagination?.currentPage;
//     const totalPages = pagination?.totalPages;
//     const pageNumbers = [];
//     const maxVisiblePages = 5;

//     if (totalPages! <= 5) {
//       for (let i = 1; i <= totalPages!; i++) {
//         pageNumbers.push(
//           <span
//             key={i}
//             onClick={() => pagination?.onPageChange(i)}
//             className={clsx(
//               'inline-flex items-center justify-center h-[32px] w-[32px] rounded-[10px] px-4 py-2 text-sm font-semibold cursor-pointer',
//               currentPage === i ? 'z-10 bg-primary text-white' : 'border border-primary hover:bg-primary hover:text-white',
//             )}
//           >
//             {i}
//           </span>,
//         );
//       }
//       return pageNumbers;
//     }

//     // Handle cases with more than 5 pages
//     const startPage = Math.max(1, currentPage! - Math.floor(maxVisiblePages / 2));
//     const endPage = Math.min(totalPages!, startPage + maxVisiblePages - 1);

//     // Show ellipsis at the beginning if necessary
//     if (startPage > 1) {
//       pageNumbers.push(
//         <span key="dots1" className="relative inline-flex border border-textSecondary items-center px-4 py-2 text-sm font-semibold text-textSecondary hover:bg-primary">
//           ...
//         </span>,
//       );
//     }

//     // Render page numbers
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <span
//           key={i}
//           onClick={() => pagination?.onPageChange(i)}
//           className={clsx(
//             'relative inline-flex items-center justify-center h-[32px] w-[32px] rounded-[10px] px-4 py-2 text-sm font-semibold cursor-pointer',
//             currentPage === i ? 'z-10 bg-primary border-textSecondary text-white' : 'border border-neutral-975 jameel-deactive hover:bg-primary-50',
//           )}
//         >
//           {i}
//         </span>,
//       );
//     }

//     // Show ellipsis at the end if necessary
//     if (endPage < totalPages!) {
//       pageNumbers.push(
//         <span
//           key="dots2"
//           className=" justify-center h-[32px] w-[32px] rounded-[10px] relative hover:bg-primary-50 inline-flex border border-neutral-975 items-center px-4 py-2 text-sm font-semibold text-gray-700"
//         >
//           ...
//         </span>,
//       );
//     }

//     return pageNumbers;
//   };

//   const paginatedData = useMemo(() => {
//     // if (!pagination)
//     return filteredData;
//     // const start = (pagination.currentPage - 1) * pagination.itemsPerPage
//     // const end = start + pagination.itemsPerPage
//     // return filteredData.slice(start, end)
//   }, [filteredData, pagination]);

//   const handleHeaderCheckboxChange = (checked: boolean) => {
//     if (!rowSelection) return;

//     const pageKeys = paginatedData.map((item) => item[rowKey]);

//     const selectedKeys = rowSelection.selectedRowKeys || [];

//     const updatedSelectedKeys = checked ? [...selectedKeys, ...pageKeys.filter((key) => !selectedKeys.includes(key))] : selectedKeys.filter((key) => !pageKeys.includes(key));

//     setCurrentPageSelections(checked ? pageKeys : []);

//     const selectedRows = dataSource?.filter((row) => updatedSelectedKeys.includes(row[rowKey])) || [];

//     rowSelection.onChange(updatedSelectedKeys, selectedRows);
//   };
//   const handleRowSelectionChange = (checked: boolean, record: any) => {
//     if (!rowSelection) return;

//     // Only select/unselect this row
//     const updatedSelectedKeys = checked ? [record[rowKey]] : [];
//     console.log('updatedSelectedKeys:', updatedSelectedKeys);
//     const selectedRows = checked ? [record] : [];

//     rowSelection.onChange(updatedSelectedKeys, selectedRows);
//     console.log('check-rowSelection:', rowSelection);
//   };

//   return (
//     <div>
//       <div className="overflow-x-auto custom-table-scroll relative">
//         <table className={clsx('bg-white border-separate border-spacing-0 min-w-full h-full rounded-lg overflow-x-auto', tableStyle)}>
//           <thead className="h-[44px]">
//             <tr className="overflow-hidden bg-tableHeader">
//               {rowSelection && (
//                 <th
//                   className={clsx(
//                     'px-4 text-left font-medium text-sm text-tableHeaderText select-none bg-tableHeader border-y border-text-500',
//                     'border-l border-text-500 rounded-tl-[10px] rounded-bl-[10px]',
//                   )}
//                 >
//                   <Checkbox
//                     // checked={currentPageSelections.length > 0 && currentPageSelections.length === paginatedData.length}
//                     // onCheckedChange={() => handleHeaderCheckboxChange(currentPageSelections.length > 0 && currentPageSelections.length === paginatedData.length)}

//                     onCheckedChange={(checked: any) => handleHeaderCheckboxChange(checked)}
//                   />
//                 </th>
//               )}

//               {columns.map((column, index) => {
//                 const isFirst = index === 0 && !rowSelection;
//                 const isLast = index === columns.length - 1;

//                 return (
//                   <th
//                     key={column.key}
//                     className={clsx('px-4 text-left text-tableHeaderText select-none bg-tableHeader border-none')}
//                     onClick={() => column.sorter && handleSort(column.key)}
//                   >
//                     <div className="flex items-center text-nowrap font-semibold text-[14px] lg:text-[18px] capitalize">
//                       {column.title}
//                       {column.sorter && renderSorterIcon(column.key)}
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>

//           <tbody className="overflow-y-auto custom-scroll scroll-smooth">
//             {paginatedData?.length > 0 ? (
//               paginatedData?.map((item, index) => (
//                 // <tr key={index} className={index !== paginatedData.length - 1 ? 'border-b border-untitle-50' : 'border-b border-untitle-50'}>
//                 <tr
//                    key={index}
//                    className='text-untitle-400 h-[52px] xl:h-[72px] border-b border-untitle-50'
//                  >
//                   {rowSelection && (
//                     <td className="px-3">
//                       <Checkbox checked={rowSelection.selectedRowKeys.includes(item[rowKey])} onCheckedChange={(checked: any) => handleRowSelectionChange(checked, item)} />
//                     </td>
//                   )}
//                   {columns.map((column) => (
//                     <td key={column.key} className="px-3 text-red text-sm lg:text-base">
//                       {column.render ? column.render(item[column.dataIndex], item, index) : item[column.dataIndex]}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr className="h-auto">
//                 <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="text-center py-4">
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {loading && (
//           <div className="absolute inset-0 flex justify-center pt-16 bg-black-8 rounded-lg">
//             <Spinner />
//           </div>
//         )}
//       </div>

//       {pagination && (
//         <div className="bg-white rounded-bl-[10px] rounded-br-[10px] h-[58px] flex p-4 items-center justify-center md:justify-between">
//           <div className="hidden  md:flex justify-between items-center gap-3">
//             <span className="text-text-25 text-sm font-normal">
//               Showing {Math.min((pagination.currentPage - 1) * pagination.itemsPerPage + 1)} to {Math.min(pagination.currentPage * pagination.itemsPerPage)} of{' '}
//               {pagination.totalItems} entries
//             </span>
//             <Select
//               value={`${pagination.itemsPerPage}`}
//               onValueChange={(value) => {
//                 pagination.setitemsPerPage?.(Number(value));
//               }}
//             >
//               <SelectTrigger className="w-[93px] rounded-[8px] p-3 gap-3 border border-text-600 bg-text-700 text-textLight-25">
//                 <SelectValue placeholder="Select a value" />
//               </SelectTrigger>

//               <SelectContent className="w-[93px] rounded-[8px] border border-text-600 bg-white text-textSecondary">
//                 <SelectGroup>
//                   {[
//                     { label: 10, value: '10' },
//                     { label: 25, value: '25' },
//                     { label: 50, value: '50' },
//                     { label: 100, value: '100' },
//                   ].map((el) => (
//                     <SelectItem key={el.value} value={el.value} className={clsx('hover:bg-primary-lightest', `${pagination.itemsPerPage}` === el.value && 'bg-primary-lightest')}>
//                       {el.label}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <nav aria-label="Pagination" className="gap-4 isolate inline-flex justify-center -space-x-px rounded-md shadow-sm">
//               <span
//                 className={clsx(
//                   'inline-flex items-center justify-center h-[32px] w-[32px] rounded-[8px] border border-text-600 text-textLight-25',
//                   pagination.currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-text-800',
//                 )}
//                 onClick={() => {
//                   if (pagination.currentPage > 1) {
//                     pagination.onPageChange(pagination.currentPage - 1);
//                   }
//                 }}
//               >
//                 <IoMdArrowBack className="text-textLight-25" size={16} />
//               </span>

//               {renderPageNumbers()}

//               <span
//                 className={clsx(
//                   'inline-flex items-center justify-center h-[32px] w-[32px] rounded-[8px] border border-text-600 text-textLight-25',
//                   pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.itemsPerPage) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-text-800',
//                 )}
//                 onClick={() => {
//                   if (pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
//                     pagination.onPageChange(pagination.currentPage + 1);
//                   }
//                 }}
//               >
//                 <IoMdArrowForward className="text-textLight-25" size={16} />
//               </span>
//             </nav>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

import React, { type FC, useMemo, useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { Checkbox } from '../checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@/utils/icons';
import { isBoolean } from 'lodash';

interface ColumnType<T> {
  title: React.ReactNode;
  dataIndex: keyof T;
  key: string;
  sorter?: (a: T, b: T) => number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface RowSelection<T> {
  selectedRowKeys: React.Key[];
  onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
}

interface TableProps<T> {
  columns: ColumnType<T>[];
  dataSource: T[];
  loading?: boolean;
  tableStyle?: string;
  rowKey: keyof T;
  pagination?: {
    totalItems: number;
    totalPages: number;
    itemCount: number;
    itemsPerPage: number;
    currentPage: number;
    setitemsPerPage?: (size: number) => void;
    onPageChange: (page: number) => void;
  };
  search?: string;
  rowSelection?: RowSelection<T>;
}

const Spinner = () => (
  <div className="w-8 h-8 rounded-full animate-spin border-2 border-solid border-primary border-t-transparent"></div>
);

const Table: FC<TableProps<any>> = ({
  columns,
  dataSource,
  loading = false,
  tableStyle = '',
  rowKey,
  pagination,
  search = '',
  rowSelection,
}) => {
  
  const [sortInfo, setSortInfo] = useState<{
    key: string;
    order: 'asc' | 'desc' | null;
  }>({ key: '', order: null });
  const [currentPageSelections, setCurrentPageSelections] = useState<React.Key[]>([]);
  const filteredData = useMemo(() => {
    let filtered = dataSource ? [...dataSource] : [];

    if (search) {
      filtered = dataSource?.filter((item) => columns.some((col) => String(item[col.dataIndex]).toLowerCase().includes(search.toLowerCase())));
    }

    if (sortInfo.order && sortInfo.key) {
      const column = columns.find((col) => col.key === sortInfo.key);
      if (column?.sorter) {
        filtered.sort((a, b) => (sortInfo.order === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)));
      }
    }

    return filtered;
  }, [dataSource, columns, search, sortInfo]);

  useEffect(() => {
    setCurrentPageSelections([]);
    rowSelection?.onChange([], []);
  }, [pagination?.currentPage]);

  const handleSort = useCallback((key: string) => {
    setSortInfo((prev) => ({
      key,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const renderSorterIcon = (fieldName: string) => {
    if (sortInfo.key !== fieldName) {
      return (
        <div className="ml-2">
          <span>
            <ChevronUpDownIcon className="hover:text-white p-0 cursor-pointer" size={16} />
          </span>
        </div>
      );
    }
    return sortInfo.order === 'asc' ? (
      <div className="ml-2">
        <span>
          <ChevronDownIcon className="hover:text-white p-0 cursor-pointer" size={16} />
        </span>{' '}
      </div>
    ) : (
      <div className="ml-2 flex flex-col gap-0 items-center leading-none">
        <span>
          <ChevronUpIcon className=" hover:text-white p-0 cursor-pointer" size={16} />
        </span>
      </div>
    );
  };

  const renderPageNumbers = () => {
    const currentPage = pagination?.currentPage;
    const totalPages = pagination?.totalPages;
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages! <= 5) {
      for (let i = 1; i <= totalPages!; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => pagination?.onPageChange(i)}
            className={clsx(
              'inline-flex items-center justify-center h-[32px] w-[32px] rounded-[10px] px-4 py-2 text-sm font-semibold cursor-pointer',
              currentPage === i ? 'z-10 bg-primary text-white' : 'border border-primary hover:bg-primary hover:text-white',
            )}
          >
            {i}
          </span>,
        );
      }
      return pageNumbers;
    }

    // Handle cases with more than 5 pages
    const startPage = Math.max(1, currentPage! - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages!, startPage + maxVisiblePages - 1);

    // Show ellipsis at the beginning if necessary
    if (startPage > 1) {
      pageNumbers.push(
        <span key="dots1" className="relative inline-flex border border-textSecondary items-center px-4 py-2 text-sm font-semibold text-textSecondary hover:bg-primary">
          ...
        </span>,
      );
    }

    // Render page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => pagination?.onPageChange(i)}
          className={clsx(
            'relative inline-flex items-center justify-center h-[32px] w-[32px] rounded-[10px] px-4 py-2 text-sm font-semibold cursor-pointer',
            currentPage === i ? 'z-10 bg-primary border-textSecondary text-white' : 'border border-neutral-975 jameel-deactive hover:bg-primary-50',
          )}
        >
          {i}
        </span>,
      );
    }

    // Show ellipsis at the end if necessary
    if (endPage < totalPages!) {
      pageNumbers.push(
        <span
          key="dots2"
          className=" justify-center h-[32px] w-[32px] rounded-[10px] relative hover:bg-primary-50 inline-flex border border-neutral-975 items-center px-4 py-2 text-sm font-semibold text-gray-700"
        >
          ...
        </span>,
      );
    }

    return pageNumbers;
  };

  const paginatedData = useMemo(() => {
    return filteredData;
   
  }, [filteredData, pagination]);

  const handleHeaderCheckboxChange = (checked: boolean) => {
    if (!rowSelection) return;

    const pageKeys = paginatedData.map((item) => item[rowKey]);

    const selectedKeys = rowSelection.selectedRowKeys || [];

    const updatedSelectedKeys = checked ? [...selectedKeys, ...pageKeys.filter((key) => !selectedKeys.includes(key))] : selectedKeys.filter((key) => !pageKeys.includes(key));

    setCurrentPageSelections(checked ? pageKeys : []);

    const selectedRows = dataSource?.filter((row) => updatedSelectedKeys.includes(row[rowKey])) || [];

    rowSelection.onChange(updatedSelectedKeys, selectedRows);
  };
  const handleRowSelectionChange = (checked: boolean, record: any) => {
    if (!rowSelection) return;

    // Only select/unselect this row
    const updatedSelectedKeys = checked ? [record[rowKey]] : [];
    console.log('updatedSelectedKeys:', updatedSelectedKeys);
    const selectedRows = checked ? [record] : [];

    rowSelection.onChange(updatedSelectedKeys, selectedRows);
    console.log('check-rowSelection:', rowSelection);
  };


  return (
    <div className="w-full overflow-x-auto relative">
      <table className={clsx('min-w-full bg-white rounded-lg', tableStyle)}>
        <thead className="bg-tableHeader h-[44px] text-tableHeaderText border border-tableHeader">
          <tr>
            {rowSelection && (
              <th className="px-4 py-2">
                <Checkbox
                  checked={currentPageSelections.length === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={(checked) => handleHeaderCheckboxChange(isBoolean(checked))}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 cursor-pointer" onClick={() => col.sorter && handleSort(col.key)}>
                <div className="flex items-center gap-1">
                  {col.title}
                  {col.sorter && renderSorterIcon(col.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="border-b border-untitle-50 h-[52px] xl:h-[72px] text-untitle-400">
                {rowSelection && (
                  <td className="px-4 py-2">
                    <Checkbox
                      checked={rowSelection.selectedRowKeys.includes(item[rowKey])}
                      onCheckedChange={(checked) => handleRowSelectionChange(isBoolean(checked), item)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-sm text-untitle-400">
                    {col.render ? col.render(item[col.dataIndex], item, index) : item[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <Spinner />
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="bg-white rounded-bl-[10px] rounded-br-[10px] h-[58px] flex p-4 items-center justify-center md:justify-between">
          <div className="hidden  md:flex justify-between items-center gap-3">
          <div className="text-untitle-300 flex items-center gap-2 text-sm text-text-25 font-normal">
            <span>Show</span>

            <Select
              value={`${pagination.itemsPerPage}`}
              onValueChange={(value) => {
                pagination.setitemsPerPage?.(Number(value));
              }}
            >
              <SelectTrigger className="w-[93px] rounded-[8px] p-2 border border-text-600 bg-white text-textSecondary">
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>

              <SelectContent className="w-[93px] rounded-[8px] border border-text-600 bg-white text-textSecondary">
                <SelectGroup>
                  {[10, 25, 50, 100].map((num) => (
                    <SelectItem
                      key={num}
                      value={`${num}`}
                      className={clsx(
                        'hover:bg-primary-lightest',
                        pagination.itemsPerPage === num && 'bg-primary-lightest'
                      )}
                    >
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <span>of {pagination.totalItems} entries</span>
          </div>

          </div>
          <div>
            <nav aria-label="Pagination" className="gap-4 isolate inline-flex justify-center -space-x-px rounded-md shadow-sm">
              <span
                className={clsx(
                  'inline-flex items-center justify-center h-[32px] w-[32px] rounded-[8px] border border-text-600 text-textLight-25',
                  pagination.currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-text-800',
                )}
                onClick={() => {
                  if (pagination.currentPage > 1) {
                    pagination.onPageChange(pagination.currentPage - 1);
                  }
                }}
              >
                <IoMdArrowBack className="text-textLight-25" size={16} />
              </span>

              {renderPageNumbers()}

              <span
                className={clsx(
                  'inline-flex items-center justify-center h-[32px] w-[32px] rounded-[8px] border border-text-600 text-textLight-25',
                  pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.itemsPerPage) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-text-800',
                )}
                onClick={() => {
                  if (pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
                    pagination.onPageChange(pagination.currentPage + 1);
                  }
                }}
              >
                <IoMdArrowForward className="text-textLight-25" size={16} />
              </span>
            </nav>
          </div>
        </div>
      )}
      {/* {pagination && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.currentPage > 1 && pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <IoMdArrowBack />
            </button>
            <button
              onClick={() =>
                pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage) &&
                pagination.onPageChange(pagination.currentPage + 1)
              }
              disabled={pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <IoMdArrowForward />
            </button>
            <Select value={`${pagination.itemsPerPage}`} onValueChange={(val) => pagination.setItemsPerPage?.(Number(val))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[10, 25, 50, 100].map((v) => (
                    <SelectItem key={v} value={`${v}`}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Table;

