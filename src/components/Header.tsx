"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../../public/logo.png'
import { ThemeToggle } from './ui/ThemeToggle'
import NavMenu from './NavMenu'
import { usePathname, useRouter } from 'next/navigation'


export const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const pathName = usePathname();

  useEffect(() => {
    setIsClient(true)

    if(pathName === '/'){
      setSelectedMenu(1);
    }
    else if (pathName === '/blog'){
      setSelectedMenu(2);
    }
  }, [pathName])

  return (
    <div className='border-b-[1px] border-[var(--gray-foreground)] h-16 w-full max-w-screen-xl mx-auto absolute left-0 right-0 z-100 px-12'>
      <div className='h-full w-full flex items-center justify-between font-[family-name:var(--font-geist-mono)]'>
        <div>
          <Image src={logo} alt='' height={32} width={32} className='rounded-md'/>
        </div>
        <div className='text-[14px] flex gap-8 h-full items-center'>
          <Link href={'/'} onClick={() => setSelectedMenu(1)} className={`${selectedMenu === 1 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
            <span>Home</span>
          </Link>
          <Link href={'/blog'} onClick={() => setSelectedMenu(2)} className={`${selectedMenu === 2 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
            <span>Blog</span>
          </Link>
          <NavMenu />
          <ThemeToggle />
        </div>
      </div>  
    </div>
  )
}
