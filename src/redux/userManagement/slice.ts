import { customToast } from '@/common/showToast';
import type { SingleUserResponse } from '@/pages/dashboard/user/Types';
import {
  changeStatusHandler,
  getSingleUserHandler,
  getUsersDataHandler,
} from '@/services/users/users';
import type { Pagination } from '@/utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  users: any[];
  singleUser: SingleUserResponse | null;
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  users: [],
  singleUser: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getUsersManagementList = createAsyncThunk(
  'getUsersManagementList',
  async (data: { page: number; limit: number; search?: string; status?: string; }, { rejectWithValue }) => {
    try {
      const response = await getUsersDataHandler(data.page, data.limit, data.search, data.status);
      return response.data?.data || [];
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';
      customToast.error(message);
      return rejectWithValue(message);
    }
  },
);


export const changeUserStatus = createAsyncThunk('changeUserStatus', async (id: number, { rejectWithValue }) => {
  try {
    const response = await changeStatusHandler(id);
    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});

export const singleUserDetail = createAsyncThunk('singleUserDetail', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getSingleUserHandler(id);
    return response.data || [];
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong';
    customToast.error(message);
    return rejectWithValue(message);
  }
});


const userManagementSlice = createSlice({
  name: 'userManagementSlice',
  initialState,
  reducers: {
    // setOpenBookingDateModal: (state, action) => {
    //   state.isOpenBookingDateModal = action.payload;
    // },
    // setOpenBookingRefundModal: (state, action) => {
    //   state.isOpenBookingRefundModal = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersManagementList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersManagementList.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getUsersManagementList.rejected, (state) => {
        state.loading = false;
      })

      .addCase(singleUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleUserDetail.fulfilled, (state, action) => {
        state.singleUser = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(singleUserDetail.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const {} = userManagementSlice.actions;
export default userManagementSlice.reducer;
