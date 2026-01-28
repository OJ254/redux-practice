'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, selectTheme } from '@/store/slices/themeSlice';
import { themeChange } from 'theme-change';

const contrastThemes = [
  { value: 'ticetDefault', label: 'Ticet Default' },
  { value: 'synthwave', label: 'Synthwave' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'aqua', label: 'Aqua' },
  { value: 'coffee', label: 'Coffee' },
];

const lightThemes = [
  { value: 'ticetLight', label: 'Ticet Light' },
  { value: 'light', label: 'Light' },
  { value: 'retro', label: 'Retro' },
  { value: 'cupcake', label: 'Cupcake' },
  { value: 'bumblebee', label: 'Bumblebee' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'valentine', label: 'Valentine' },
  { value: 'garden', label: 'Garden' },
  { value: 'lofi', label: 'Lofi' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'cmyk', label: 'CMYK' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'acid', label: 'Acid' },
  { value: 'lemonade', label: 'Lemonade' },
  { value: 'winter', label: 'Winter' },
  { value: 'nord', label: 'Nord' },
  { value: 'caramellatte', label: 'Caramellatte' },
];

const darkThemes = [
  { value: 'ticetDark', label: 'Ticet Dark' },
  { value: 'dark', label: 'Dark' },
  { value: 'halloween', label: 'Halloween' },
  { value: 'forest', label: 'Forest' },
  { value: 'black', label: 'Black' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'business', label: 'Business' },
  { value: 'night', label: 'Night' },
  { value: 'dim', label: 'Dim' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'abyss', label: 'Abyss' },
  { value: 'silk', label: 'Silk' },
];

const allThemes = [...contrastThemes, ...lightThemes, ...darkThemes];

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const [activeTab, setActiveTab] = useState<'contrast' | 'light' | 'dark'>(
    'contrast'
  );

  useEffect(() => {
    themeChange(false); // DaisyUI initialization

    // Automatically select the tab based on current theme
    queueMicrotask(() => {
      if (contrastThemes.some(t => t.value === currentTheme)) {
        setActiveTab('contrast');
      } else if (lightThemes.some(t => t.value === currentTheme)) {
        setActiveTab('light');
      } else if (darkThemes.some(t => t.value === currentTheme)) {
        setActiveTab('dark');
      }
    });
  }, [currentTheme]);

  const handleTabClick = (
    tab: 'contrast' | 'light' | 'dark',
    themes: { value: string; label: string }[]
  ) => {
    setActiveTab(tab);
    if (themes.length > 0) {
      dispatch(setTheme(themes[0].value as any));
    }
  };

  const renderSelect = (themes: typeof contrastThemes) => (
    <select
      className='select select-bordered w-full'
      value={currentTheme}
      onChange={e => dispatch(setTheme(e.target.value as any))}
    >
      {themes.map(t => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );

  const activeThemeLabel =
    allThemes.find(t => t.value === currentTheme)?.label || 'None';

  return (
    <div className='primary-surface w-full p-6'>
      <p className='mb-4 font-semibold'>Active theme: {activeThemeLabel}</p>
      <div className='tabs tabs-lift mt-4'>
        <input
          type='radio'
          name='theme_tabs'
          className='tab'
          aria-label='Contrast'
          checked={activeTab === 'contrast'}
          onChange={() => handleTabClick('contrast', contrastThemes)}
        />
        <div className='tab-content bg-base-100 border-base-300 p-6'>
          {renderSelect(contrastThemes)}
        </div>

        <input
          type='radio'
          name='theme_tabs'
          className='tab'
          aria-label='Light'
          checked={activeTab === 'light'}
          onChange={() => handleTabClick('light', lightThemes)}
        />
        <div className='tab-content bg-base-100 border-base-300 p-6'>
          {renderSelect(lightThemes)}
        </div>

        <input
          type='radio'
          name='theme_tabs'
          className='tab'
          aria-label='Dark'
          checked={activeTab === 'dark'}
          onChange={() => handleTabClick('dark', darkThemes)}
        />
        <div className='tab-content bg-base-100 border-base-300 p-6'>
          {renderSelect(darkThemes)}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
