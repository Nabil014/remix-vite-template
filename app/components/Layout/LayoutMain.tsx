import { Outlet, useLocation } from '@remix-run/react';
import { useState } from 'react';
import SidebarMain from './sidebarMain';
import NavbarMain from './navbarMain';


export default function LayoutMain({ userId }: any) {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  // Determinar si estamos en la landing page
  const isLandingPage = location.pathname === '/';

  return (
    <>
      <NavbarMain toggleSidebar={toggleSidebar} showSidebar={showSidebar} userId={userId} />
      <div className={`h-[90vh] mt-[66px] pt-2 ${!isLandingPage && 'sm:ml-0 md:ml-[260px]'}`}>
        {!isLandingPage && <SidebarMain showSidebar={showSidebar} />}
        <Outlet />
      </div>
    </>
  );
}

