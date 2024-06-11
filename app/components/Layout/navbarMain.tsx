import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from '@remix-run/react';

interface Props {
  toggleSidebar: () => void;
  showSidebar: boolean;
  userId: any;
}

export default function NavbarMain({
  toggleSidebar,
  showSidebar,
  userId,
}: Props) {
  const location = useLocation();

  // Check if the current path is "/login"
  if (location.pathname === '/login') {
    return null;
  }

  if (location.pathname === '/register') {
    return null;
  }

  if (location.pathname === '/forgot/password') {
    return null;
  }

  return (
    <nav className='fixed bg-gradient-to-r from-[#000b0c] via-[#031a1b] to-[#000b0c] top-0 z-50 w-full  dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start rtl:justify-end'>
            <button
              onClick={toggleSidebar}
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-400 rounded-lg md:hidden  focus:outline-none  dark:text-gray-400 '
            >
              {showSidebar ? (
                <XMarkIcon className='size-6' />
              ) : (
                <Bars3Icon className='size-6' />
              )}
            </button>
            <Link
              to='/'
              className='flex ms-2 md:me-24'
            >
              <img
                src='https://res.cloudinary.com/dug5cohaj/image/upload/v1714945513/qg0xzn0ocr0vz9nafhim.png'
                className='h-8 me-3'
                alt='FlowBite Logo'
              />
            </Link>
          </div>
          <div className='max-w-screen-xl px-4 py-3 mx-auto'>
            <div className='hidden items-center md:flex'>
              <ul className='flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm'>
                <li>
                  <a
                    href='/'
                    className='text-white dark:text-white hover:underline'
                    aria-current='page'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-white dark:text-white hover:underline'
                  >
                    Company
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-white dark:text-white hover:underline'
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href='/'
                    className='text-white dark:text-white hover:underline'
                  >
                    Features
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {userId && (
            <Link to='/dashboard/home'>
              <button
                type='button'
                className='text-black mr-4 bg-white hover:bg-[#04E6E6] focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#04E6E6]'
              >
                Dashboard
              </button>
            </Link>
          )}

          {!userId && (
            <Link to='/login'>
              <button
                type='button'
                className='text-black bg-white hover:bg-[#04E6E6] focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#04E6E6]'
              >
                Log In
              </button>
            </Link>
          )}
          {!userId && (
            <Link
              className='ml-4'
              to='/register'
            >
              <button
                type='button'
                className='text-white bg-black hover:bg-[#04E6E6] focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#04E6E6]'
              >
                Register
              </button>
            </Link>
          )}
          {userId && (
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <Link
                    to={'/profile'}
                    className='justify-between'
                  >
                    Profile
                    <span className='badge'>New</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/settings'}>Settings</Link>
                </li>
                <li>
                  <Link to='/logout'>Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
