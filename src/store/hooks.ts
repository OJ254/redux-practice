// src/redux/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/types';

/**
 * Custom typed dispatch hook that wraps Redux's useDispatch.
 * This pre-typed version saves us from having to type `dispatch` as `AppDispatch` everywhere.
 *
 * @returns A properly typed dispatch function for this store
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom typed selector hook that wraps Redux's useSelector.
 * Provides type safety by enforcing the RootState type when selecting the state.
 * Using this hook ensures we don't need to type `(state: RootState)` every time.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
