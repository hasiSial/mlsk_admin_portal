import type { ParentCategories } from '@/pages/public/Types';
import { FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';

interface Props {
  uuid: string;
  data: ParentCategories;
  familyId?: number | null;
  isParentCategory: boolean;
}

const AccessClientCategoriesOverview = ({ uuid, data, familyId = null, isParentCategory = true }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const categoryId = data?.lookupId || data?.categoryId;

    if (!categoryId) return;

    navigate(routes.accessSpecficClientData(isParentCategory, uuid, categoryId, data?.name, familyId ?? undefined));
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition duration-300 ease-out 
      hover:scale-[1.03] hover:shadow-lg
      flex flex-col justify-between
      border border-borderDefault roundedDefault 
      p-3 h-[110px] sm:h-[120px] bg-white"
    >
      <div className="flex items-center justify-between text-primary">
        <img alt="icon" src={data?.icon} className="w-6 h-6 object-contain" />
        <FaAngleRight className="text-sm opacity-70" />
      </div>

      <h5 className="text-textDefault text-xs sm:text-sm md:text-base font-medium leading-tight">{data?.name}</h5>
    </div>
  );
};

export default AccessClientCategoriesOverview;
