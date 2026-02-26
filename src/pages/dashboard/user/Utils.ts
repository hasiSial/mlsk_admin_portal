
export const getUserStatusBadge = (status: string) => {
  const statusMap: Record<string, string> = {
    'active': 'w-fit flex items-center justify-center bg-greenOverlay text-green hover:bg-greenOverlay rounded-[10px] p-1 gap-3',
    'inactive': 'w-fit bg-redOverlay flex items-center justify-center text-red hover:bg-redOverlay rounded-[10px] p-1 gap-3',
  };

  return statusMap[status] || 'w-fit flex items-center justify-center bg-textSecondary text-white hover:bg-textSecondary/15 rounded-[10px] p-1 gap-3';
};






