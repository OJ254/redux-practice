// rootReducer.ts
// Root reducer: combines all feature slice reducers into a single reducer used by the store.
// Strong TypeScript inference for RootState is preserved.

import { combineReducers } from '@reduxjs/toolkit';

// Import your individual slice reducers here
// Example placeholders; replace/add slices per project
import themeReducer from './slices/themeSlice';
// Add more as needed

// Combine reducers
// Keys here become top-level state keys: state.auth, state.user, state.ui
const rootReducer = combineReducers({
  theme: themeReducer, // Authentication/session info
  // Add more slices here as needed
});

export default rootReducer;
