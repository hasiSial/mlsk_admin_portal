// import { useParams } from 'react-router-dom';
// import Icon from '@/components/ui/svg_icon/SvgIcon';
// import { useEffect, useState } from 'react';
// import { useAppDispatch } from '@/redux/Hooks';
// import { getAccessClientDependentLifeStyleData, getAccessClientDependentMedicineData, getAccessClientSingleCategoryDetail } from '@/redux/accessRequest/slice';
// import Loader from '@/components/ui/loader/Loader';
// import { checkIsDynamicCategory } from '../Utils';
// import MedicineCategoryOverview from '@/components/features/accessClientRequest/categories/medicineCategoryOverview';
// import type { MedicineProvider } from '../Types';

// const SpecificClientCategoryDataDetail = () => {
//   const { uuid, categoryId, familyId, categoryName } = useParams();
//   const [loading, setLoading] = useState(false);
//   const dispatch = useAppDispatch();
//   const [categoryDetail, setCategoryDetail] = useState<any>();
//   const [medicalCategoryDetail, setMedicalCategoryDetail] = useState<MedicineProvider[] | null>();
//   const [lifeStyleCategoryDetail, setLifeStyleCategoryDetail] = useState<any>();

//   useEffect(() => {
//     if (categoryId && familyId) {
//       const isNonDymanic = checkIsDynamicCategory(Number(categoryId));
//       if (isNonDymanic) {
//         if (categoryId == '403' || categoryId == '30002') {
//           const fetchMedicalCategoryData = async () => {
//             try {
//               if (!categoryId) return;
//               setLoading(true);

//               const res = await dispatch(
//                 getAccessClientDependentMedicineData({
//                   uuid: uuid!,
//                   familyId: Number(familyId) ?? undefined,
//                 }),
//               ).unwrap();

//               setMedicalCategoryDetail(res?.data || []);
//             } catch (error) {
//               console.log('dependents error:', error);
//             } finally {
//               setLoading(false);
//             }
//           };
//           fetchMedicalCategoryData();
//         } else if (categoryId == '30013') {
//           const fetchLifeStyleCategoryData = async () => {
//             try {
//               if (!categoryId) return;
//               setLoading(true);

//               const res = await dispatch(
//                 getAccessClientDependentLifeStyleData({
//                   uuid: uuid!,
//                   familyId: Number(familyId) ?? undefined,
//                 }),
//               ).unwrap();

//               setLifeStyleCategoryDetail(res?.data || []);
//             } catch (error) {
//               console.log('dependents error:', error);
//             } finally {
//               setLoading(false);
//             }
//           };
//           fetchLifeStyleCategoryData();
//         }
//       } else {
//         const fetchParentData = async () => {
//           try {
//             if (!categoryId) return;
//             setLoading(true);

//             const res = await dispatch(
//               getAccessClientSingleCategoryDetail({
//                 uuid: uuid!,
//                 familyId: Number(familyId) ?? undefined,
//                 categoryId: Number(categoryId),
//                 isParentCategory: true,
//               }),
//             ).unwrap();

//             setCategoryDetail(res?.data || []);
//           } catch (error) {
//             console.log('dependents error:', error);
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchParentData();
//       }
//     }
//   }, [categoryId, familyId]);

//   return (
//     <>
//       {loading && <Loader />}

//       <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 bg-neutral-200">
//         <div className="w-full h-full roundedDefault p-4 sm:p-5 md:p-6 bg-white">
//           <div className="flex items-center gap-3">
//             <span>
//               <Icon icon="/icons/hand.svg" className="text-primary" />
//             </span>
//             <h4 className="text-2xl text-black font-bold">{categoryName ?? ''}</h4>
//           </div>
//           {categoryId === '403' || categoryId === '30002' ? (
//             <MedicineCategoryOverview record={medicalCategoryDetail} />
//           ) : categoryDetail?.length > 0 ? (
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mt-4">
//               {categoryDetail.map((item: any, i: number) => (
//                 <div key={i} className="rounded-lg w-full min-h-[332px] h-auto p-3 space-y-3 col-span-12 lg:col-span-4 border border-borderDefault2 bg-specificCard">
//                   <h4 className="text-textDefault font-bold text-base">Do you have any known {item?.name}?</h4>

//                   <p className="text-primary text-sm font-semibold">Yes</p>

//                   {(item?.answeredQuestions || []).map((itemAnswerQuestion: any, index: number) => (
//                     <div key={index}>
//                       <p className="text-xs text-textDefault font-medium">{itemAnswerQuestion?.question}</p>
//                       <p className="text-primary text-sm font-semibold">{itemAnswerQuestion?.answer}</p>
//                       <span className="block w-full border-b border-[#ccdce8] mt-2 mb-2"></span>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="col-span-12">
//               <p className="text-xs text-textDefault font-medium">No records are currently available.</p>
//             </div>
//           )}

//           {/* <div className="rounded-lg w-full min-h-[332px] h-auto p-3 space-y-3 col-span-12 lg:col-span-4 border border-borderDefault2 bg-specificCard">
//               <h4 className="text-textDefault font-bold text-base">Do you experience symptoms of allergic reactions?</h4>
//               <p className="text-primary text-sm font-semibold">Yes</p>

//               <p className="text-xs text-textDefault font-medium">Skin Reactions</p>
//               <p className="text-primary text-sm font-semibold">Rash, Hives, Swelling (angioedema)</p>
//               <span className="block w-full border-b border-[#ccdce8]"></span>

//               <p className="text-xs text-textDefault font-medium">Respiratory Reactions</p>
//               <p className="text-primary text-sm font-semibold">Sneezing, Wheezing </p>
//               <span className="block w-full border-b border-[#ccdce8]"></span>

//               <p className="text-xs text-textDefault font-medium">Cardiovascular Reactions</p>
//               <p className="text-primary text-sm font-semibold">Dizziness, Lightheadedness </p>
//               <span className="block w-full border-b border-[#ccdce8]"></span>

//               <p className="text-xs text-textDefault font-medium">Anaphylactic Reactions</p>
//               <p className="text-primary text-sm font-semibold">Swelling of the throat and tongue, Difficulty breathing </p>
//             </div>

//             <div className="rounded-lg w-full min-h-[332px] h-auto p-3 space-y-3 col-span-12 lg:col-span-4 border border-borderDefault2 bg-specificCard">
//               <h4 className="text-textDefault font-bold text-base">Have you ever been hospitalised due to an allergic reaction?</h4>
//               <p className="text-primary text-sm font-semibold">Yes</p>

//               <p className="text-xs text-textDefault font-medium">Please Specify</p>
//               <p className="text-primary text-sm font-semibold">Severe allergic reaction to peanuts in 2019, required emergency treatment.</p>
//             </div>

//             <div className="rounded-lg w-full min-h-[332px] h-auto p-3 space-y-3 col-span-12 lg:col-span-6 border border-borderDefault2 bg-specificCard">
//               <h4 className="text-textDefault font-bold text-base">Have you ever experienced an anaphylactic reaction?</h4>
//               <p className="text-primary text-sm font-semibold">Yes</p>

//               <p className="text-xs text-textDefault font-medium">Please Specify</p>
//               <p className="text-primary text-sm font-semibold">
//                 In 2020, I experienced a severe anaphylactic reaction after consuming a dish containing tree nuts, which required immediate medical attention.
//               </p>
//             </div>
//             <div className="rounded-lg w-full min-h-[332px] h-auto p-3 space-y-3 col-span-12 lg:col-span-6 border border-borderDefault2 bg-specificCard">
//               <h4 className="text-textDefault font-bold text-base">Have you ever used an epinephrine auto-injector (e.g., EpiPen)?</h4>
//               <p className="text-primary text-sm font-semibold">Yes</p>

//               <p className="text-xs text-textDefault font-medium">Please Specify</p>
//               <p className="text-primary text-sm font-semibold">In 2021, I used an EpiPen after experiencing a severe allergic reaction to shellfish while dining out.</p>
//             </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SpecificClientCategoryDataDetail;

import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/Hooks';
import { getAccessClientDependentLifeStyleData, getAccessClientDependentMedicineData, getAccessClientSingleCategoryDetail } from '@/redux/accessRequest/slice';
import Loader from '@/components/ui/loader/Loader';
import { checkIsDynamicCategory } from '../Utils';
import MedicineCategoryOverview from '@/components/features/accessClientRequest/categories/medicineCategoryOverview';
import type { LifeStyleData, MedicineProvider } from '../Types';
import LifeStyleCategoryOverview from '@/components/features/accessClientRequest/categories/lifeStyleCategoryOverview';
import DynamicCategoryOverview from '@/components/features/accessClientRequest/categories/dynamicCategoryOverview';
import { FaArrowLeft } from 'react-icons/fa';
import { useClientRequestActionManager } from '../useClientRequestActionManager';

const SpecificClientCategoryDataDetail = () => {
  const navigate = useNavigate();
  const { uuid, categoryId, familyId, categoryName, isParentCategory } = useParams();
  const dispatch = useAppDispatch();

  const { medicalCategoryDetail, lifeStyleCategoryDetail, loading, categoryDetail, fetchParentData, fetchLifeStyleCategoryData, fetchMedicalCategoryData } =
    useClientRequestActionManager();

  useEffect(() => {
    if (!categoryId || !familyId) return;

    const isNonDynamic = checkIsDynamicCategory(Number(categoryId));

    if (isNonDynamic) {
      if (categoryId === '403' || categoryId === '30002') {
        fetchMedicalCategoryData(uuid!, Number(familyId));
      } else if (categoryId === '30013') {
        fetchLifeStyleCategoryData(uuid!, Number(familyId));
      } else {
        fetchParentData(uuid!, Number(familyId), Number(categoryId), Boolean(isParentCategory));
      }
    } else {
      fetchParentData(uuid!, Number(familyId), Number(categoryId), Boolean(isParentCategory));
    }
  }, [categoryId, familyId, uuid, dispatch]);

  return (
    <>
      {loading && <Loader />}

      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 bg-neutral-200">
        <div className="w-full h-full roundedDefault p-4 sm:p-5 md:p-6 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              <p className="font-semibold text-primary">Back</p>
            </div>
            <span>
              <Icon icon="/icons/hand.svg" className="text-primary" />
            </span>
            <h4 className="text-2xl text-black font-bold">{categoryName ?? ''}</h4>
          </div>

          {/* Render based on category type */}
          {categoryId === '403' || categoryId === '30002' ? (
            <MedicineCategoryOverview record={medicalCategoryDetail} />
          ) : categoryId === '30013' ? (
            <LifeStyleCategoryOverview record={lifeStyleCategoryDetail} />
          ) : categoryDetail?.length > 0 ? (
            <DynamicCategoryOverview record={categoryDetail} />
          ) : (
            <div className="col-span-12 mt-6">
              <p className="text-xs text-textDefault font-medium">No records are currently available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpecificClientCategoryDataDetail;
