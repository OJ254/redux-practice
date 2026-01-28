// store.ts
'use client'; // Required for redux-persist in Next.js (browser-only APIs)

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
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
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (process.env.NODE_ENV === 'development') {
      return middlewares.concat(logger);
    }

    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Persistor
export const persistor = persistStore(store);
