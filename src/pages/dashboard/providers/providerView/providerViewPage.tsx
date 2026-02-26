// import { Button } from '@/components/ui/button';
// import { useAppDispatch } from '@/redux/Hooks';
// import { useEffect } from 'react';
// import { FaArrowLeftLong } from 'react-icons/fa6';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useProviderActionManager } from '../providerActionManager';
// import { useSelector } from 'react-redux';
// import type { RootState } from '@/redux/Store';
// import Loader from '@/components/ui/loader/Loader';


// const providerViewPage = () => {
//   const { handleGetSingleProvider } = useProviderActionManager();
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const {loading,singleProvider} = useSelector((state:RootState)=>state.providerManagement)

//   useEffect(() => {
//     if (id) {
//       handleGetSingleProvider(Number(id));
//     }
//   }, [id, dispatch]);

 

//   return (
//     <>
//         {loading && <Loader />}
//         <div className='w-full'>

//         </div>
      
//     </>
//   );
// };

// export default providerViewPage;
import React, { useEffect, useState } from "react";
import { useProviderActionManager } from "../providerActionManager";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/redux/Hooks";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/Store";
import Loader from "@/components/ui/loader/Loader";
import NextImage from "@/components/ui/nextImage/NextImage";
import { Button } from "@/components/ui/button";
import { providerDetailPayload } from "../Utils";
import UserTable from "@/components/features/user/userTable";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProviderDetails = () => {
const [showUsers, setShowUsers] = useState(false);
const [users, setUsers] = useState<any[]>([]);
const { handleGetSingleProvider,providerLoading,handleGetUserByProviderCound } = useProviderActionManager();
const navigate = useNavigate();
const { id } = useParams<{ id: string }>();
const dispatch = useAppDispatch();
const {loading,singleProvider,providerUsers,pagination} = useSelector((state:RootState)=>state.providerManagement)

  useEffect(() => {
    if (id) {
      handleGetSingleProvider(Number(id));
    }
  }, [id, dispatch]);

  const handleToggleUsers = async () => {
    if (!showUsers) {
      await handleGetUserByProviderCound(Number(id));
    }

    setShowUsers((prev) => !prev);
  };


  return (
    <>{providerLoading &&<Loader />}
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <NextImage image={singleProvider?.bannerPicture ?? '/med-legal-logo.svg'} classNames="w-full h-full object-cover"/>
          </div>

          <div className="p-6 space-y-4">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                {singleProvider?.name ?? ''}
              </h1>

              <Button
                onClick={handleToggleUsers}
                className="px-6 py-2 rounded-xl h-[44px] transition duration-300 flex items-center gap-2"
              >
                {showUsers ? (
                  <>
                    <FaEyeSlash size={16} />
                    Hide Users
                  </>
                ) : (
                  <>
                    <FaEye size={16} />
                    Show Users
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-textDefault">
              {providerDetailPayload(singleProvider!).map((item, index) => (
                <p key={index}>
                  <strong className="text-black">{item.label}:</strong> {item.value || '-'}
                </p>
              ))}
           
            </div>
          </div>

          {showUsers && (
            <UserTable loading={loading} records={providerUsers } pagination={pagination}/>
          )}
        </div>

        

      </div>
    </div>
    </>
  );
};

export default ProviderDetails;