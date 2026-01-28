// src/redux/slices/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/index.ts';

export type Theme = 'ticetDefault' | 'ticetLight' | 'ticetDark';

interface ThemeState {
  current: Theme;
}

// Pure initial state
const initialState: ThemeState = {
  current: 'ticetDefault',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.current = action.payload;
    },
    toggleTheme(state) {
      const themes: Theme[] = ['ticetDefault', 'ticetLight', 'ticetDark'];
      const currentIndex = themes.indexOf(state.current);
      const nextIndex = (currentIndex + 1) % themes.length;
      state.current = themes[nextIndex];
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Selector
export const selectTheme = (state: RootState) => state.theme.current;

export default themeSlice.reducer;
