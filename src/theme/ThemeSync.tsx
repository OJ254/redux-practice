'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from '@/store/slices/themeSlice';
import { themeChange } from 'theme-change';

const ThemeSync = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // On mount: read theme from localStorage
  useEffect(() => {
    themeChange(false); // DaisyUI initialization
    const savedTheme = localStorage.getItem('theme') as typeof theme | null;
    if (savedTheme) dispatch(setTheme(savedTheme));
  }, [dispatch]);

  // Apply theme to DOM and localStorage whenever state changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return null; // no UI
};

export default ThemeSync;
