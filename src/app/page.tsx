'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers, fetchUserById } from '@/store/slices/userSlice';
import {
  AllUsersList,
  SelectedUserCard,
  ThemeToggle,
  ThemeSwitcher,
} from '@/components/shared';
import { Button } from '@mui/material';

const Page = () => {
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const { users, user, loadingAll, loadingSingle, errorAll, errorSingle } =
    useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) dispatch(fetchUserById(selectedUser));
  }, [dispatch, selectedUser]);

  return (
    <div className='body text-base-content min-h-screen'>
      {/* Header */}
      <header className='header'>
        <div className='navbar bg-base-200 px-6 shadow'>
          <div className='flex-1'>
            <h3>Starter Template</h3>
          </div>
          {/*Theme Toggle*/}
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/*Theme Switcher*/}
        <section>
          <ThemeSwitcher />
        </section>
        {/* Hero */}
        <section className='primary-surface hero px-6 py-12'>
          <div className='hero-content prose max-w-3xl flex-col text-center'>
            <h1>Next.js 16 + Tailwind 4 + DaisyUI 5 + MUI 7</h1>

            <div className='grid place-items-center'>
              <p className='opacity-80'>
                A simple starter page to test themes, UI components, and layout
                structure. Edit <code className='code'>page.tsx</code> to begin.
              </p>

              <div className='flex gap-4'>
                <Button variant='contained' className='primary-btn-contained'>
                  Primary Action
                </Button>

                <Button variant='outlined' className='primary-btn-outlined'>
                  Secondary Action
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Components Preview */}
        <section className='body px-6 py-12'>
          <h3 className='mb-8 text-center text-2xl font-semibold'>
            UI Components Preview
          </h3>

          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4'>
            <div className='primary-surface shadow'>
              <div className='card-body'>
                <h4 className='card-title'>Theme Support</h4>
                <p>
                  Switch between Light, Dark, and Contrast themes using DaisyUI.
                </p>
              </div>
            </div>

            <div className='primary-surface shadow'>
              <div className='card-body'>
                <h4 className='card-title'>MUI Integration</h4>
                <p>
                  Material UI buttons styled together with Tailwind and DaisyUI
                  utilities.
                </p>
              </div>
            </div>

            <div className='primary-surface shadow'>
              <div className='card-body'>
                <h4 className='card-title'>Ready for Redux</h4>
                <p>
                  Redux Toolkit can be added easily for state management when
                  needed.
                </p>
              </div>
            </div>

            <div className='primary-surface shadow'>
              <div className='card-body'>
                <h4 className='card-title'>Axios Support</h4>
                <p>
                  Built-in Axios configuration for making secure API requests to
                  the backend.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='body flex flex-col items-center px-6 py-12 pt-6'>
          <h3 className='mb-8 text-center text-2xl font-semibold'>
            Redux Example - userSlice
          </h3>

          <div className='flex w-full max-w-7xl flex-col justify-center gap-8 md:flex-row lg:gap-16'>
            <div className='primary-surface w-full p-6 shadow-xl lg:w-1/2 xl:w-2/3'>
              <h2 className='primary-text pb-8'>All Users</h2>
              <AllUsersList
                users={users}
                loading={loadingAll}
                error={errorAll}
                onSelect={setSelectedUser}
              />
            </div>
            <div className='primary-surface max-h-max w-full p-6 shadow-xl lg:w-1/2 xl:w-1/3'>
              <h2 className='primary-text pb-8'>Selected User</h2>
              <SelectedUserCard
                user={user}
                loading={loadingSingle}
                error={errorSingle}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='primary-surface footer footer-center text-base-content p-6 pt-4'>
        <p>Next.js Starter Template 🚀 by Japheth Oruko</p>
      </footer>
    </div>
  );
};

export default Page;
