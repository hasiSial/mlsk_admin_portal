import { customToast } from '@/common/showToast';
import { commonFileUploadHandler, getCityHandler, getCountriesHandler, getStateHandler } from '@/services/common/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Types for countries and states
interface Country {
  countryId: number;
  name: string;
}

interface StateType {
  stateId: number;
  name: string;
}

interface CommonState {
  loading: boolean;
  countries: Country[];
  states: StateType[];
  cities: any;
}

const initialState: CommonState = {
  loading: false,
  countries: [],
  states: [],
  cities: [],
};

// Async Thunks
export const commonFileUpload = createAsyncThunk('commonFileUpload', async (data: any, { rejectWithValue }) => {
  try {
    const response = await commonFileUploadHandler(data);
    return response.data;
  } catch (error: any) {
    customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const getCountriesRecord = createAsyncThunk('getCountriesRecord', async (_, { rejectWithValue }) => {
  try {
    const response = await getCountriesHandler();
    return response.data; // payload is already the array of countries
  } catch (error: any) {
    customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const getStatesRecord = createAsyncThunk('getStatesRecord', async (countryIso: number, { rejectWithValue }) => {
  try {
    const response = await getStateHandler(countryIso);
    return response.data;
  } catch (error: any) {
    customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const getCitiesRecord = createAsyncThunk('getCitiesRecord', async (data: any, { rejectWithValue }) => {
  try {
    const response = await getCityHandler(data?.stateIso);
    return response.data;
  } catch (error: any) {
    customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Slice
const commonApiManagementSlice = createSlice({
  name: 'commonApiManagementSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Countries
      .addCase(getCountriesRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountriesRecord.fulfilled, (state, action) => {
        state.countries = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getCountriesRecord.rejected, (state) => {
        state.loading = false;
      })

      // States
      .addCase(getStatesRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatesRecord.fulfilled, (state, action) => {
        state.states = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getStatesRecord.rejected, (state) => {
        state.loading = false;
      })

      //cities
      .addCase(getCitiesRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCitiesRecord.fulfilled, (state, action) => {
        state.cities = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getCitiesRecord.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commonApiManagementSlice.reducer;
