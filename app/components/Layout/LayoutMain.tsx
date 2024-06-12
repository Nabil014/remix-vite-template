import { useState } from 'react';
import { Outlet, useLocation } from '@remix-run/react';
import NavbarMain from './navbarMain';
import SidebarMain from './sidebarMain';


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
      <div className={`h-dvh mt-[72px] ${!isLandingPage && 'sm:ml-0 md:ml-[250px]'}`}>
        {!isLandingPage && <SidebarMain showSidebar={showSidebar} />}
        <Outlet />
      </div>
    </>
  );
}

