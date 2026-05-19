import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// --- Thunks for API Calls ---

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Not authenticated');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // returns { success, message, email }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data.user; // sets httpOnly cookie automatically
  } catch (error) {
    // If 403 (Not verified), we reject with a specific payload to trigger OTP redirect
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Login failed';
    return thunkAPI.rejectWithValue({ status, message, email: userData.email });
  }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (data, thunkAPI) => {
  try {
    const response = await api.post('/auth/verify-otp', data);
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Verification failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

// --- Auth Slice ---

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start true to check auth on initial load
  isError: false,
  message: '',
  requireOtpEmail: null, // Used to trigger redirect to OTP page
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.isError = false;
      state.message = '';
      state.requireOtpEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => { state.isLoading = true; })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Login
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message;
        if (action.payload?.status === 403) {
          state.requireOtpEmail = action.payload.email; // Trigger redirect
        }
      })
      // Register
      .addCase(registerUser.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requireOtpEmail = action.payload.email; // Trigger redirect
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.requireOtpEmail = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;