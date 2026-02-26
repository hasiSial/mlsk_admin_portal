import type { FamilyMembers } from "@/pages/dashboard/user/Types";

interface Props {
  data: FamilyMembers;
}

const UserFamilyDetailOverview = ({ data }: Props) => {


  return (
    <div key={data.userFamilyId}
        className="flex flex-col border border-borderDefault rounded-lg p-4 cursor-pointer
        transition duration-300 ease-out
        hover:scale-[1.03] hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <p className="text-primary text-lg font-semibold"><strong className="text-black">Full Name:</strong> {data.name || 'N/A'}</p>
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
            {data.gender}
        </span>
      </div>
      <div className="mt-3 space-y-2">
          <p className="text-textDefault text-base font-normal"><strong className="text-black font-medium">DOB:</strong> {data.dateOfBirth || 'N/A'}</p>
          <p className={`text-base font-normal ${data?.isActive ? 'text-green' : 'text-red'}`}><strong className="text-black font-medium">Status:</strong> {data.isActive ? 'Active' : 'Inactive'}</p>

      </div>    
    </div>
  );
};

export default UserFamilyDetailOverview;