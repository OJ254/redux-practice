// store.ts
'use client'; // Required for redux-persist in Next.js (browser-only APIs)

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Root reducer placeholder, to be replaced per project
import rootReducer from './rootReducer';

// Optional: for SSR-safe storage
import { createNoopStorage } from '@/utils/noopStorage'; // create a small helper for server
// Detect if running in the browser
const isBrowser = typeof window !== 'undefined';
const safeStorage = isBrowser ? storage : createNoopStorage();

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: safeStorage,
  whitelist: ['theme'], // Add slice names you want to persist per project
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Persistor
export const persistor = persistStore(store);

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
