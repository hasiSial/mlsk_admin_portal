import type { Pagination } from '@/utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  amenities: any[];
  pagination: Pagination;
  isOpenCreateAmenityModal: boolean;
  isOpenEditAmenityModal: boolean;
}

const initialState: State = {
  loading: false,
  amenities: [],
  isOpenCreateAmenityModal: false,
  isOpenEditAmenityModal: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls

export // Create slice
const settingManagementSlice = createSlice({
  name: 'settingManagementSlice',
  initialState,
  reducers: {
    setOpenCreateAmenityModal: (state, action) => {
      state.isOpenCreateAmenityModal = action.payload;
    },
    setOpenEditAmenityModal: (state, action) => {
      state.isOpenEditAmenityModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
    //get gym lists
  },
});

export const { setOpenCreateAmenityModal, setOpenEditAmenityModal } = settingManagementSlice.actions;
export default settingManagementSlice.reducer;
