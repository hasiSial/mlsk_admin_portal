import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import type { ParentCategories, ParentInfo } from '../Types';
import { useAppDispatch } from '@/redux/Hooks';
import { getAccessClientDependentFamilyData, getAccessParentData } from '@/redux/accessRequest/slice';
import AccessClientDependentsOverview from '@/components/features/accessClientRequest/accessClientDependents';
import AccessClientCategoriesOverview from '@/components/features/accessClientRequest/accessClientCategories';
import AccessClientDocumentsOverview from '@/components/features/accessClientRequest/accessClientDocuments';

const AccessClientDataPage = () => {
  const { uuid } = useParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Medical Info');
  const tabs = ['Medical Info', 'Dependents Info', 'Documents'];
  const [userInfoRecord, setUserInfoRecord] = useState<ParentInfo | null>(null);
  const [dependentsFamilyRecord, setDependentsFamilyRecord] = useState<ParentCategories[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [selectedDependentId, setSelectedDependentId] = useState<number | null>(null);
  useEffect(() => {
    const fetchParentData = async () => {
      try {
        if (!uuid) return;
        setLoading(true);

        const res = await dispatch(getAccessParentData(uuid)).unwrap();
        setUserInfoRecord(res?.data || []);
      } catch (error) {
        console.log('dependents error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, [uuid, dispatch]);

  const fetchClientDependentFamily = async (familyId: number) => {
    setLoading(true);

    try {
      const res = await dispatch(getAccessClientDependentFamilyData({ uuid: uuid!, familyId })).unwrap();
      if (res?.status) {
        setDependentsFamilyRecord(res?.data);
      } else {
        setDependentsFamilyRecord(null);
      }
    } catch (error) {
      console.log('getting error while fetching client dependent family api:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userInfoRecord &&
      // (
        <div className="min-h-screen p-3 sm:p-4 md:p-6 bg-neutral-200">
          <div className="w-full h-full roundedDefault p-4 sm:p-5 md:p-6 bg-white">
            <h2 className="text-xl sm:text-2xl font-bold text-start">Own Health Information</h2>
            <p className="text-start font-medium text-sm sm:text-base md:text-lg text-textDefault mb-5 sm:mb-6">{`Here You Can Track “${userInfoRecord?.name ?? ''}” Health Information`}</p>
            <Tabs
              value={activeTab}
              className="w-full"
              onValueChange={(val) => {
                setActiveTab(val);

                // reset jab tab change ho
                setSelectedDependentId(null);
                setDependentsFamilyRecord(null);
              }}
            >
              {/* Tabs List */}
              <div className="overflow-x-auto">
                <TabsList className="h-[50px] w-[850px] border border-borderDefault flex justify-start gap-2 mb-4 sm:mb-6 2xl:mb-8">
                  {tabs.map((item) => (
                    <TabsTrigger
                      key={item}
                      value={item}
                      className="
                    flex-shrink-0
                    w-[100px] sm:w-[130px] md:w-[150px] lg:w-[279px] h-[40px]
                    text-textSecondary 
                    bg-transparent 
                    !shadow-none 
                    rounded-[6px] text-sm sm:text-base
                    
                    data-[state=active]:text-white 
                    data-[state=active]:font-semibold 
                    data-[state=active]:border-primary 
                    data-[state=active]:bg-primary 

                    hover:text-primary 
                    hover:border-secondary
                    text-center
                    whitespace-nowrap
                  "
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tabs Content */}
              <TabsContent className="shadow-none overflow-x-auto" value="Medical Info">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {userInfoRecord?.parentCategories?.length > 0 ? (
                    userInfoRecord.parentCategories.map((item: ParentCategories, index: number) => (
                      <div key={item?.lookupId || index}>
                        <AccessClientCategoriesOverview isParentCategory={true} uuid={uuid!} data={item} familyId={userInfoRecord?.familyId} />
                      </div>
                    ))
                  ) : (
                    <p className="text-text-500 font-medium col-span-full text-center">No record found</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent className="shadow-none overflow-x-auto" value="Dependents Info">
                {!selectedDependentId && (
                  <AccessClientDependentsOverview
                    onSelectDependent={async (familyId: number) => {
                      setSelectedDependentId(familyId);
                      await fetchClientDependentFamily(familyId);
                    }}
                  />
                )}

                {selectedDependentId && (
                  <>
                    {/* Back button */}
                    <div
                      className="flex items-center gap-2 mb-4 cursor-pointer"
                      onClick={() => {
                        setSelectedDependentId(null);
                        setDependentsFamilyRecord(null);
                      }}
                    >
                      <FaArrowLeft />
                      <p className="font-semibold text-primary">Back</p>
                    </div>

                    {/* categories after dependent click */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                      {dependentsFamilyRecord ? (
                        dependentsFamilyRecord.map((item: ParentCategories, index: number) => (
                          <div key={item?.lookupId || index}>
                            <AccessClientCategoriesOverview isParentCategory={false} uuid={uuid!} data={item} familyId={selectedDependentId} />
                          </div>
                        ))
                      ) : (
                        <p className="text-text-500 font-medium col-span-full text-center">No record found</p>
                      )}
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent className="shadow-none overflow-x-auto" value="Documents">
                  <AccessClientDocumentsOverview  
                    familyId={userInfoRecord?.familyId}
                  />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      // ) : (
      //   <p className="text-center h-screen flex items-center justify-center text-base font-medium text-text-500">
      //     You don't have access yet. We've sent an SMS to Elias Vance. Once they approve,
      //     <br /> you'll be able to access this page.
      //   </p>
      // )
      }
    </>
  );
};

export default AccessClientDataPage;
