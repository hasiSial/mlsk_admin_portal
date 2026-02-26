import UserDetailOverview from "@/components/features/user/view/userDetailOverview";
import UserEmergencyContactOverview from "@/components/features/user/view/userEmergencyContactOverview";
import NextImage from "@/components/ui/nextImage/NextImage";
import { useAppDispatch } from "@/redux/Hooks";
import type { RootState } from "@/redux/Store";
import { singleUserDetail } from "@/redux/userManagement/slice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewUserPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {loading,singleUser} = useSelector((state:RootState)=>state.userManagement)

    useEffect(() => {
        if (id) {
            dispatch(singleUserDetail(Number(id)))
        }
    }, [id, dispatch]);

  return (
    <div className="p-6 space-y-6">

        <UserDetailOverview data={singleUser!?.user}/>

        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">
                Emergency Contacts
            </h3>

            {singleUser?.emergencyContacts &&
                singleUser.emergencyContacts.length > 0 ? (
                    <div className="grid grid-cols-4 space-y-4">
                        {singleUser.emergencyContacts.map((contact) => (
                            <UserEmergencyContactOverview data={contact}/>
                        ))}
                    </div>
            ) : (
                <p className="text-gray-400 text-sm">
                No emergency contacts added.
                </p>
            )}
        </div>

        

      



      {/* 🔹 Family Members */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Family Members
        </h3>

        {singleUser?.familyMembers.length > 0 ? (
          <div className="space-y-4">
            {singleUser?.familyMembers.map((member: any) => (
              <div
                key={member.id}
                className="border rounded-lg p-4"
              >
                <p className="font-semibold">{member.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No family members added.
          </p>
        )}
      </div>

    </div>
  );
};

export default ViewUserPage;