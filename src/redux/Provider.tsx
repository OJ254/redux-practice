'use client'; // Marks this component as a client component (required for Redux hooks and persistence in the App Router).

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import PageLoading from '@/components/ui/feedback//spinner/PageLoading';

/**
 * Providers
 * Wraps the application tree with:
 * - Redux <Provider>: makes the store available to any nested component.
 * - <PersistGate>: delays UI rendering until persisted state has been rehydrated.
 *
 * Props:
 * - children: React nodes that will consume the Redux store and persisted state.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    // Expose the Redux store to all descendants.
    <Provider store={store}>
      {/*
              PersistGate delays rendering of children until redux-persist
              has rehydrated the store from storage.
              - loading={null}: render nothing while rehydrating (custom fallback can be provided).
              - persistor: controller returned by persistStore(store).
            */}
      <PersistGate loading={<PageLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
