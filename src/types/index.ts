// @/types/index.ts

import { store } from '@/store/store';

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface AxiosError {
  status: number | null;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface UserState {
  users: User[];
  user: User | null;
  loadingAll: boolean;
  loadingSingle: boolean;
  errorAll: string | null;
  errorSingle: string | null;
}
