// src/redux/slices/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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

// // src/redux/slices/themeSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
//
// export type Theme = 'ticetDefault' | 'ticetLight' | 'ticetDark';
//
// interface ThemeState {
//   current: Theme;
// }
//
// const initialState: ThemeState = {
//   current:
//     typeof window !== 'undefined'
//       ? (localStorage.getItem('theme') as Theme) || 'ticetDefault'
//       : 'ticetDefault',
// };
//
// const themeSlice = createSlice({
//   name: 'theme',
//   initialState,
//   reducers: {
//     setTheme(state, action: PayloadAction<Theme>) {
//       state.current = action.payload;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('theme', action.payload);
//         document.documentElement.setAttribute('data-theme', action.payload);
//       }
//     },
//     toggleTheme(state) {
//       const themes: Theme[] = ['ticetDefault', 'ticetLight', 'ticetDark'];
//       const currentIndex = themes.indexOf(state.current);
//       const nextIndex = (currentIndex + 1) % themes.length;
//       state.current = themes[nextIndex];
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('theme', state.current);
//         document.documentElement.setAttribute('data-theme', state.current);
//       }
//     },
//   },
// });
//
// export const { setTheme, toggleTheme } = themeSlice.actions;
//
// // Selector
// export const selectTheme = (state: RootState) => state.theme.current;
//
// export default themeSlice.reducer;
