import React, { PropsWithChildren } from 'react'
import SideBar from './ui/SideBar'
import { Bars3Icon } from '@heroicons/react/16/solid'
import { Session } from '@/lib/session'
import Navbar from './navbar'

type Props = PropsWithChildren


const MobileNavbar = ({ session }: { session: Session | null }) => {
  return (
    <div className='md:hidden'>
      <SideBar
        triggerIcon={<Bars3Icon className='w-4' />}
        triggerClassName='absolute top-2 left-2'
      >
        <Navbar session={session}/>
      </SideBar>
    </div>
  )
}

export default MobileNavbar