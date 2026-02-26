import { useAppDispatch } from '@/redux/Hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customToast } from '@/common/showToast';
import { getAccessClientDependentLifeStyleData, getAccessClientDependentMedicineData, getAccessClientSingleCategoryDetail } from '@/redux/accessRequest/slice';
import type { LifeStyleData, MedicineProvider } from './Types';

export const useClientRequestActionManager = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState<any[]>([]);
  const [medicalCategoryDetail, setMedicalCategoryDetail] = useState<MedicineProvider[] | null>(null);
  const [lifeStyleCategoryDetail, setLifeStyleCategoryDetail] = useState<LifeStyleData | null>(null);

  //get classes list
  const fetchParentData = async (uuid: string, familyId: number, categoryId: number, isParentCategory: boolean) => {
    try {
      setLoading(true);
      const res = await dispatch(
        getAccessClientSingleCategoryDetail({
          uuid: uuid!,
          familyId: Number(familyId),
          categoryId: Number(categoryId),
          isParentCategory: Boolean(isParentCategory),
        }),
      ).unwrap();
      setCategoryDetail(res?.data || []);
    } catch (error) {
      console.error('Parent category error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicalCategoryData = async (uuid: string, familyId: number) => {
    try {
      setLoading(true);
      const res = await dispatch(
        getAccessClientDependentMedicineData({
          uuid: uuid!,
          familyId: Number(familyId),
        }),
      ).unwrap();
      setMedicalCategoryDetail(res?.data || []);
    } catch (error) {
      console.error('Medicine category error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLifeStyleCategoryData = async (uuid: string, familyId: number) => {
    try {
      setLoading(true);
      const res = await dispatch(
        getAccessClientDependentLifeStyleData({
          uuid: uuid!,
          familyId: Number(familyId),
        }),
      ).unwrap();
      setLifeStyleCategoryDetail(res?.data || null);
    } catch (error) {
      console.error('Lifestyle category error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categoryDetail,
    medicalCategoryDetail,
    lifeStyleCategoryDetail,
    fetchParentData,
    fetchLifeStyleCategoryData,
    fetchMedicalCategoryData,
  };
};
