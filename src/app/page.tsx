'use client';

import { ThemeSwitcher, ThemeToggle } from '@/components';
import { Button } from '@mui/material';

const Page = () => {
  return (
    <div className='bg-base-100 text-base-content min-h-screen'>
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
        <section className='hero px-6 py-12'>
          <div className='hero-content prose max-w-2xl flex-col text-center'>
            <h1>Next.js + Tailwind + DaisyUI + MUI</h1>

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
        </section>

        {/* Components Preview */}
        <section className='body px-6 py-12 pt-6'>
          <h3 className='mb-8 text-center text-2xl font-semibold'>
            UI Components Preview
          </h3>

          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4'>
            <div className='surface'>
              <div className='card-body'>
                <h4 className='card-title'>Theme Support</h4>
                <p>
                  Switch between Light, Dark, and Contrast themes using DaisyUI.
                </p>
              </div>
            </div>

            <div className='surface'>
              <div className='card-body'>
                <h4 className='card-title'>MUI Integration</h4>
                <p>
                  Material UI buttons styled together with Tailwind and DaisyUI
                  utilities.
                </p>
              </div>
            </div>

            <div className='surface'>
              <div className='card-body'>
                <h4 className='card-title'>Ready for Redux</h4>
                <p>
                  Redux Toolkit can be added easily for state management when
                  needed.
                </p>
              </div>
            </div>

            <div className='card bg-base-100 shadow'>
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
      </main>

      {/* Footer */}
      <footer className='body footer footer-center text-base-content p-6 pt-4'>
        <p>Next.js Starter Template 🚀 by Japheth Oruko</p>
      </footer>
    </div>
  );
};

export default Page;
