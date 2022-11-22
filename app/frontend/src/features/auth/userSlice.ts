import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import { UserData } from './userService';

export interface UserState {
  user: UserData | null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string | unknown
};

// Get username from local storage
const locallyStoredUserData = localStorage.getItem('user');
const user = locallyStoredUserData ? JSON.parse(locallyStoredUserData) : null;

const initialState: UserState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Register user
export const register = createAsyncThunk('auth/register', async (user: UserData, thunkAPI) => {
  try {
    return await userService.register(user);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;