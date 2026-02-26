export const getStatusBadge = (isActive: boolean) => {
  const statusMap: Record<string, string> = {
    Active: 'flex item-center justify-center rounded-full h-[24px] w-fit bg-success-500/15 text-success-500 hover:bg-success-500/15',
    Inactive: 'flex item-center justify-center rounded-full h-[24px] w-fit bg-error-500/15 text-error-500 hover:bg-error-500/15',
  };
  const statusClass = statusMap[isActive ? 'Active' : 'Inactive'] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return statusClass;
};

export const homePageDemeData = {
  todayBooking: '1020',
  activeGyms: '1020',
  totalClassListed: '120',
  totalRevenue: '21,020',

  bookingOverTime: [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 28 },
    { name: 'Mar', value: 25 },
    { name: 'Apr', value: 33 },
    { name: 'May', value: 31 },
    { name: 'Jun', value: 68 },
    { name: 'Jul', value: 12 },
    { name: 'Aug', value: 21 },
    { name: 'Sep', value: 19 },
    { name: 'Oct', value: 14 },
    { name: 'Nov', value: 65 },
    { name: 'Dec', value: 49 },
  ],
  revenueByGym: [
    { name: 'Jan', value: 11 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 25 },
    { name: 'Apr', value: 23 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 55 },
    { name: 'Jul', value: 12 },
    { name: 'Aug', value: 21 },
    { name: 'Sep', value: 12 },
    { name: 'Oct', value: 68 },
    { name: 'Nov', value: 65 },
    { name: 'Dec', value: 49 },
  ],
  topDisciplines: [
    { name: 'Rental Fees', value: 700, color: '#19354D' },
    { name: 'Service Fees', value: 200, color: '#AB202B' },
    { name: 'Other', value: 100, color: '#4CAF50' },
  ],
  userGrowth: [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 40 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 55 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 68 },
    { name: 'Jul', value: 12 },
    { name: 'Aug', value: 21 },
    { name: 'Sep', value: 12 },
    { name: 'Oct', value: 68 },
    { name: 'Nov', value: 65 },
    { name: 'Dec', value: 49 },
  ],
  multiChartData: [
    { name: 'Week 1', new: 22, complete: 18, cancel: 4 },
    { name: 'Week 2', new: 28, complete: 20, cancel: 6 },
    { name: 'Week 3', new: 33, complete: 25, cancel: 5 },
    { name: 'Week 4', new: 40, complete: 30, cancel: 8 },
    { name: 'Week 5', new: 37, complete: 32, cancel: 7 },
    { name: 'Week 6', new: 45, complete: 38, cancel: 5 },
    { name: 'Week 7', new: 50, complete: 40, cancel: 9 },
    { name: 'Week 8', new: 42, complete: 35, cancel: 6 },
    // { name: 'Week 9', new: 38, complete: 33, cancel: 4 },
    // { name: 'Week 10', new: 47, complete: 36, cancel: 11 },
    // { name: 'Week 11', new: 52, complete: 45, cancel: 7 },
    // { name: 'Week 12', new: 55, complete: 48, cancel: 6 },
  ],
};
