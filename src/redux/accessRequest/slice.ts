import { customToast } from '@/common/showToast';
import {
  createRequestClientDataAccessHandler,
  getAccessClientAccountDependentsHandler,
  getAccessClientDependentFamilyDataHandler,
  getAccessClientSingleCategoryDataHandler,
  getAccessParentDataHandler,
  getClientDependentDocumentsDetail,
  getClientDependentFeedingDetail,
  getClientDependentLifeStyleDetail,
  getClientDependentMedicineDetail,
  getClientDependentVaccinationDetail,
} from '@/services/accessRequest/accessRequest';
import type { Pagination } from '@/utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const CreateAccessClientDataRequest = createAsyncThunk('CreateAccessClientDataRequest', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createRequestClientDataAccessHandler(data);

    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const getAccessClientAccountDependents = createAsyncThunk('getAccessClientAccountDependents', async (uuid: string, { rejectWithValue }) => {
  try {
    const response = await getAccessClientAccountDependentsHandler(uuid);
    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const getAccessParentData = createAsyncThunk('getAccessParentData', async (uuid: string, { rejectWithValue }) => {
  try {
    const response = await getAccessParentDataHandler(uuid);
    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const getAccessClientDependentFamilyData = createAsyncThunk(
  'getAccessClientDependentFamilyData',
  async ({ uuid, familyId }: { uuid: string; familyId: number }, { rejectWithValue }) => {
    try {
      const response = await getAccessClientDependentFamilyDataHandler(uuid, familyId);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAccessClientDependentMedicineData = createAsyncThunk(
  'getAccessClientDependentFamilyData',
  async ({ uuid, familyId }: { uuid: string; familyId: number }, { rejectWithValue }) => {
    try {
      const response = await getClientDependentMedicineDetail(uuid, familyId);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAccessClientDependentLifeStyleData = createAsyncThunk(
  'getAccessClientDependentFamilyData',
  async ({ uuid, familyId }: { uuid: string; familyId: number }, { rejectWithValue }) => {
    try {
      const response = await getClientDependentLifeStyleDetail(uuid, familyId);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAccessClientDependentFeedingData = createAsyncThunk(
  'getAccessClientDependentFamilyData',
  async ({ uuid, familyId }: { uuid: string; familyId: number }, { rejectWithValue }) => {
    try {
      const response = await getClientDependentFeedingDetail(uuid, familyId);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAccessClientDependentVaccinationData = createAsyncThunk(
  'getAccessClientDependentFamilyData',
  async ({ uuid, familyId }: { uuid: string; familyId: number }, { rejectWithValue }) => {
    try {
      const response = await getClientDependentVaccinationDetail(uuid, familyId);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAccessClientDependentDocumentsData = createAsyncThunk(
  'getAccessClientDependentFamilyData',
  async ({ uuid, familyId }: { uuid: string; familyId: number }, { rejectWithValue }) => {
    try {
      const response = await getClientDependentDocumentsDetail(uuid, familyId);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAccessClientSingleCategoryDetail = createAsyncThunk(
  'getAccessClientSingleCategoryDetail',
  async ({ uuid, familyId, categoryId, isParentCategory }: { uuid: string; familyId: number; categoryId: number; isParentCategory: boolean }, { rejectWithValue }) => {
    console.log({ uuid, familyId, categoryId, isParentCategory });
    try {
      const response = await getAccessClientSingleCategoryDataHandler(uuid, familyId, categoryId, isParentCategory);
      return response?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';

      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

const accessRequestrSlice = createSlice({
  name: 'accessRequestrSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const {} = accessRequestrSlice.actions;
export default accessRequestrSlice.reducer;
