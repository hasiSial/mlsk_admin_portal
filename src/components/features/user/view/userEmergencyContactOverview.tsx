import type { EmergencyContacts } from "@/pages/dashboard/user/Types";

interface Props {
  data: EmergencyContacts;
}

const UserEmergencyContactOverview = ({ data }: Props) => {


  return (
    <div key={data.userEmergencyContactId}
        className="border rounded-lg p-4 flex justify-between items-center"
    >
        <div>
            <p className="font-semibold">{data.name}</p>
            <p className="text-sm text-gray-500">{data.relation}</p>
            <p className="text-sm text-gray-500">{data.fullPhone}</p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
            {data.isAccountRepresentative
            ? "Representative"
            : "Contact"}
        </span>
    </div>
  );
};

export default UserEmergencyContactOverview;