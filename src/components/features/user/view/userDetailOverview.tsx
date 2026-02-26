import NextImage from "@/components/ui/nextImage/NextImage"
import type { singleUserType } from "@/pages/dashboard/user/Types"
import type { FC } from "react"

interface Props {
  data: singleUserType;
}

const UserDetailOverview: FC<Props> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-6">
                <NextImage image={data?.avatar ?? ''} classNames="w-24 h-24 rounded-full object-cover border"/>

            <div>
                <h2 className="text-2xl font-bold text-primary">
                {data?.name}
                </h2>
                <p className="text-textDefault">{data?.email}</p>
                <p className="text-textDefault">{data?.fullPhone}</p>

                <div className="mt-2 flex gap-3 text-sm">
                <span className="text-sm font-semibold text-primary px-3 py-1 rounded-full">
                    {data?.gender}
                </span>

                <span className={`text-sm px-3 py-1 font-semibold rounded-full ${data?.isActive ? 'text-green' : 'text-red'}`}>
                    {data?.isActive ? 'Active' : 'Inactive'}
                </span>

                <span className="font-semibold text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {data?.language}
                </span>
                </div>
            </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div>
                    <p className="text-textDefault font-medium">Date of Birth</p>
                    <p className="font-semibold">
                    {data?.dateOfBirth
                        ? new Date(data?.dateOfBirth).toLocaleDateString()
                        : 'N/A'}
                    </p>         
                </div>

            <div>
                <p className="text-textDefault font-medium">Referral Code</p>
                <p className="font-semibold">{data?.referralCode}</p>
            </div>

            <div>
                <p className="text-textDefault font-medium">Phone Verified</p>
                <p className="font-semibold">
                {data?.isPhoneVerified ? 'Yes' : 'No'}
                </p>
            </div>

            <div>
                <p className="text-textDefault font-medium">Share Location</p>
                <p className="font-semibold">
                {data?.shareLocation ? 'Enabled' : 'Disabled'}
                </p>
            </div>
            </div>
      </div>
    )


}

export default UserDetailOverview