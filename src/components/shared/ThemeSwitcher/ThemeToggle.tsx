'use client';

import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '@/store/slices/themeSlice';

const ThemeToggle = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderIcon = () => {
    if (theme === 'ticetDefault') return <Brightness4Icon />;
    if (theme === 'ticetLight') return <LightModeIcon />;
    return <DarkModeIcon />;
  };

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      aria-label='Toggle theme'
      className='text-primary'
    >
      {renderIcon()}
    </IconButton>
  );
};

export default ThemeToggle;
