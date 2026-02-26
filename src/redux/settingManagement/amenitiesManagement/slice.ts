import { customToast } from '@/common/showToast';
import type { AmenitiesType } from '@/pages/dashboard/settings/types';
import {
  createNewAmenityDataHandler,
  deleteAmenityHandler,
  getAmenitiesDataHandler,
  getSingleAmenityDataHandler,
  updateSingleAmenityDataHandler,
} from '@/services/settings/amenities';
import type { Pagination } from '@/utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  amenities: AmenitiesType[];
  singleAmenity: AmenitiesType | null;
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  amenities: [],
  singleAmenity: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getAmenitiesManagementList = createAsyncThunk('getAmenitiesManagementList', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await getAmenitiesDataHandler(data.page, data.limit);
    return response.data?.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const CreateNewAmenity = createAsyncThunk('CreateNewAmenity', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createNewAmenityDataHandler(data);

    return response.data?.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const getSingleAmenityRecord = createAsyncThunk('amenities/getSingle', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getSingleAmenityDataHandler(id);
    const data = response.data.data;
    return data || null;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const updateAmenity = createAsyncThunk('updateAmenity', async (data: { id: number; payload: any }, { rejectWithValue }) => {
  try {
    const response = await updateSingleAmenityDataHandler(data.id, data.payload);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const deleteAmenityData = createAsyncThunk('deleteAmenity', async (id: number, { rejectWithValue }) => {
  try {
    const response = await deleteAmenityHandler(id);
    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

const amenitiesManagementSlice = createSlice({
  name: 'amenitiesManagementSlice',
  initialState,
  reducers: {
    // setCurrentPage: (state, action) => {
    //   state.currentPage = action.payload;
    // },
    // setOpenBookingRefundModal: (state, action) => {
    //   state.isOpenBookingRefundModal = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder

      // SINGLE
      .addCase(getSingleAmenityRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleAmenityRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAmenity = action.payload;
      })
      .addCase(getSingleAmenityRecord.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAmenitiesManagementList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAmenitiesManagementList.fulfilled, (state, action) => {
        state.amenities = action.payload.amenities;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getAmenitiesManagementList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = amenitiesManagementSlice.actions;
export default amenitiesManagementSlice.reducer;
