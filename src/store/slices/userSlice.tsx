// @/redux/slices/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/api';
import { User, UserState, AxiosError } from '@/types';

// ----------------------
// Async Thunks
// ----------------------

// Fetch all users
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error: unknown) {
    // Cast to your structured Axios error
    const err = error as AxiosError;
    return rejectWithValue(err.message || 'An unexpected error occurred');
  }
});

// Fetch single user by ID
export const fetchUserById = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>('user/fetchUserById', async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error: unknown) {
    // Cast to your structured Axios error
    const err = error as AxiosError;
    return rejectWithValue(err.message || 'An unexpected error occurred');
  }
});

// ----------------------
// Slice
// ----------------------

const initialState: UserState = {
  users: [],
  user: null,
  loadingAll: false,
  loadingSingle: false,
  errorAll: null,
  errorSingle: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.errorAll = null;
      state.errorSingle = null;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: builder => {
    // Fetch all users
    builder
      .addCase(fetchUsers.pending, state => {
        state.loadingAll = true;
        state.errorAll = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loadingAll = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload || 'Failed to fetch users';
      });

    // Fetch single user
    builder
      .addCase(fetchUserById.pending, state => {
        state.loadingSingle = true;
        state.errorSingle = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loadingSingle = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingSingle = false;
        state.errorSingle = action.payload || 'Failed to fetch user';
      });
  },
});

// Export actions for UI
export const { clearError, clearUser } = userSlice.actions;

// Export reducer for store
export default userSlice.reducer;

// if you want to console.log every action including fulfilled and rejected actions use either one of the following options:
// // Option 1: Log inside extraReducers
//   .addCase(fetchUsers.fulfilled, (state, action) => {
//     console.log('Redux fulfilled action:', action.payload); // 👈 Chrome console
//     state.users = action.payload;
//   });
//
//
//
// // Option 2: Add a logger middleware (best practice)
// // Install redux-logger:
//
// yarn add redux-logger
//
// // In your store:
//
//   import logger from 'redux-logger';
//
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(logger),
// });
// // Now every action will appear in Chrome Console automatically.
