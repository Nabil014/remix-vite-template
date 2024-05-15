import { Outlet } from '@remix-run/react'
import { useState } from 'react'
import SidebarMain from './sidebarMain'
import NavbarMain from './navbarMain'

export default function LayoutMain({ userId }: any) {
  const [showSidebar, setShowSidebar] = useState(false)

  function toggleSidebar() {
    setShowSidebar(!showSidebar)
  }

  return (
    <>
      <NavbarMain
        userId={userId}
        toggleSidebar={toggleSidebar}
        showSidebar={showSidebar}
      />
      <div className='h-full mt-[66px] pt-2 sm:ml-0 md:ml-[260px] '>
        <SidebarMain showSidebar={showSidebar} />

        <Outlet />
      </div>
    </>
  )
}
