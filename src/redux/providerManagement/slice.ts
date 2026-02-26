import { customToast } from '@/common/showToast';
import type { ProviderListTypes } from '@/pages/dashboard/providers/Types';
import type { SingleUserResponse, UserListPayloadTypes } from '@/pages/dashboard/user/Types';
import { createNewProviderHandler, deleteProviderHandler, getProvidersDataHandler, getSingleProviderHandler, getUserByProviderCount, updateProviderHandler } from '@/services/providers/providers';
import type { Pagination } from '@/utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  singleLoading:boolean;
  providers: ProviderListTypes[];
  singleProvider: ProviderListTypes | null;
  providerUsers:UserListPayloadTypes[];
  pagination: Pagination;
  isOpenAddNewProvider:boolean
  isOpenEditProvider:boolean
}

const initialState: State = {
  loading: false,
  singleLoading:false,
  providers: [],
  singleProvider: null,
  providerUsers:[],
  isOpenAddNewProvider:false,
  isOpenEditProvider:false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getProvidersManagementList = createAsyncThunk(
  'getProvidersManagementList',
  async (data: { page: number; limit: number; search?: string;}, { rejectWithValue }) => {
    try {
      const response = await getProvidersDataHandler(data.page, data.limit, data.search);
      return response.data?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';
      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const CreateNewProvider = createAsyncThunk('CreateNewProvider', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createNewProviderHandler(data);

    return response.data?.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});


export const getSingleProviderRecord = createAsyncThunk('getSingleProviderRecord', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getSingleProviderHandler(id);
    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const getUsersByProviderCountRecords = createAsyncThunk('getUsersByProviderCountRecords', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getUserByProviderCount(id);
    customToast.success(response?.data?.message);
    return response.data?.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const UpdateProvider = createAsyncThunk('UpdateProvider', async (data: any, { rejectWithValue }) => {
  try {
    const response = await updateProviderHandler(data?.providerId,data);
    customToast.success(response?.data?.message);
    return response.data?.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});


export const deleteProviderRecord = createAsyncThunk('deleteProviderRecord', async (id: number, { rejectWithValue }) => {
  try {
    const response = await deleteProviderHandler(id);
    customToast.success(response?.data?.message);
    return response.data?.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

const providerManagementSlice = createSlice({
  name: 'providerManagementSlice',
  initialState,
  reducers: {
    setIsOpenAddNewProvider: (state, action) => {
      state.isOpenAddNewProvider = action.payload;
    },
    setIsOpenEditProvider: (state, action) => {
      state.isOpenEditProvider = action.payload;
    },

    setResetSingleProvider: (state, action) => {
      state.singleProvider = action.payload ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProvidersManagementList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProvidersManagementList.fulfilled, (state, action) => {
        state.providers = action.payload.providers;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getProvidersManagementList.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getSingleProviderRecord.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(getSingleProviderRecord.fulfilled, (state, action) => {
        state.singleProvider = action.payload?.data;
        state.singleLoading = false;
      })
      .addCase(getSingleProviderRecord.rejected, (state) => {
        state.singleLoading = false;
      })

      .addCase(getUsersByProviderCountRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersByProviderCountRecords.fulfilled, (state, action) => {
        state.providerUsers = action.payload?.users;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getUsersByProviderCountRecords.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const {setIsOpenAddNewProvider,setIsOpenEditProvider,setResetSingleProvider} = providerManagementSlice.actions;
export default providerManagementSlice.reducer;
