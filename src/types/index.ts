import { store } from '@/redux/store';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
  user: User | null;
  loadingUsers: boolean;
  loadingUser: string | null;
  error: string | null;
}

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
