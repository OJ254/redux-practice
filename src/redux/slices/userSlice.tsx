import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@/api/api';
import { User, UserState } from '@/types';

// export const fecthUsers = createAsyncThunk<User[]>(
//   'user/fetchUsers',
//   async () => {
//     const response = await api.get('/users');
//     return response.data;
//   }
// );

// Define the thunk
export const fetchUsers = createAsyncThunk<User[]>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>('/api/users');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
