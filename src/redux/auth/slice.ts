import { customToast } from '@/common/showToast';
import { adminLoginHandler, contactSaleHandler, forgetPasswordHandler, otpVerifyHandler, resetPasswordHandler } from '@/services/auth/auth';
import { AVATAR_KEY, FORGOT_EMAIL_KEY, FORGOT_OTP_KEY, TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY, USER_ROLE } from '@/utils/constants';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

// initial state
interface AuthState {
  token: string | null;
  email: string | null;
  forgetPasswordEmail: string | null;
  name: string | null;
  otp: string | null;
  avatar: string | null;
  role: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  email: localStorage.getItem(FORGOT_EMAIL_KEY) || null,
  name: localStorage.getItem(USER_NAME_KEY) || null,
  otp: localStorage.getItem(FORGOT_OTP_KEY) || null,
  avatar: localStorage.getItem(AVATAR_KEY) || null,
  role: localStorage.getItem(USER_ROLE) || null,
  userId: localStorage.getItem(USER_ROLE) ? Number(localStorage.getItem(USER_ID_KEY)) : null,
  forgetPasswordEmail: null,
};

// Calls
export const adminLogin = createAsyncThunk('adminLogin', async (data: any, { rejectWithValue }) => {
  const { email, password } = data;
  try {
    const response = await adminLoginHandler(email, password);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const forgetPassword = createAsyncThunk('forgetPassword', async (data: any, { rejectWithValue }) => {
  try {
    const response = await forgetPasswordHandler(data?.email);
    return response.data;
  } catch (error: any) {
    // customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const verifyOTP = createAsyncThunk('verifyOTP', async (data: any, { rejectWithValue }) => {
  const { otp, email } = data;
  try {
    const response = await otpVerifyHandler(email, otp);
    return response.data;
  } catch (error: any) {
    customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk('resetPassword', async (data: any, { rejectWithValue }) => {
  const { token, password, passwordConfirmation } = data;
  try {
    const response = await resetPasswordHandler(token, password, passwordConfirmation);
    return response.data;
  } catch (error: any) {
    customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const sendSaleContact = createAsyncThunk('sendSaleContact', async (data: any, { rejectWithValue }) => {
  const { name, email, message } = data;
  try {
    const response = await contactSaleHandler(name, email, message);
    return response.data;
  } catch (error: any) {
    // customToast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem(TOKEN_KEY, action.payload);
    },
    setUserInfo: (state, action: PayloadAction<{ avatar: string; userId: number; name: string; role: string }>) => {
      state.avatar = action.payload.avatar;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
      localStorage.setItem(AVATAR_KEY, action.payload.avatar);
      localStorage.setItem(USER_NAME_KEY, action.payload.name);
      localStorage.setItem(USER_ROLE, action.payload.role);
      localStorage.setItem(USER_ID_KEY, action.payload.userId.toString());
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },

    setForgetPasswordEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.forgetPasswordEmail = action.payload.email;
    },
  },
});

export const { setToken, removeToken, setUserInfo, setForgetPasswordEmail } = authSlice.actions;
export default authSlice.reducer;
