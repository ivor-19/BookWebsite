"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../../public/logo.png'
import { ThemeToggle } from './ui/ThemeToggle'
import NavMenu from './NavMenu'
import { usePathname } from 'next/navigation'
import { Slider } from './Slider'
import { PopoverMenu } from './PopoverMenu'


export const Header = () => {
  const pathName = usePathname();

 
  return (
    <div className='border-b-[1px] border-[var(--gray-foreground)] h-16 w-full max-w-screen-xl mx-auto absolute left-0 right-0 z-100 px-12 header-mobile'>
      <div className='h-full w-full flex items-center justify-between font-[family-name:var(--font-geist-mono)]'>
        <div>
          <Image src={logo} alt='' height={32} width={32} className='rounded-md'/>
        </div>
        <div className='text-[14px] flex gap-8 h-full items-center max-sm:hidden'>
          <Link href={'/user'} className={`${pathName === '/user' ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
            <span>Home</span>
          </Link>
          <Link href={'/user/blog'} className={`${pathName === '/user/blog' ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
            <span>Blog</span>
          </Link>
          <Link href={'/user/books/add-book'} className={`${pathName === '/user/add-book' ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
            <span>Add Your Book</span>
          </Link>
          <NavMenu />
          <ThemeToggle />
        </div>
        <PopoverMenu />
      </div>  
    </div>
  )
}
