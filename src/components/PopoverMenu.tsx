import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import NavMenu from './NavMenu'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { AlignJustify } from 'lucide-react'
import { ThemeToggle } from './ui/ThemeToggle'
import { Loading } from './Loading'
import { useRouter } from 'next/navigation'

export const PopoverMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/auth/login');
    }, 3000)
  }

  useEffect(() => {
      // setIsClient(true)
      if(pathName === '/user'){
        setSelectedMenu(1);
        setOpen(false);
      }
      else if (pathName === '/user/blog'){
        setSelectedMenu(2);
        setOpen(false);
      }
      else if (pathName === '/user/books/add-book'){
        setSelectedMenu(3);
        setOpen(false);
      }
    }, [pathName])

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className='hidden max-sm:block'>
          <Button variant="outline">
            <AlignJustify />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mx-10'>
          <div className="flex flex-col gap-6 font-geist text-[16px] p-4">
            <Link href={'/user'} onClick={() => setSelectedMenu(1)} className={`${selectedMenu === 1 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
              <span>Home</span>
            </Link>
            <Link href={'/user/blog'} onClick={() => setSelectedMenu(2)} className={`${selectedMenu === 2 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
              <span>Blog</span>
            </Link>
            <Link href={'/user/books/add-book'} onClick={() => setSelectedMenu(3)} className={`${selectedMenu === 3 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md `}>
              <span>Add Your Book</span>
            </Link>
            <a onClick={handleLogout} className={`cursor-pointer p-2 rounded-md hover:bg-[var(--gray-foreground)]`}>
              <span>Logout</span>
            </a>
            <ThemeToggle />
          </div>
          
        </PopoverContent>
      </Popover>
      <Loading open={loading} setOpen={setLoading} note={'Logging Out'}/>
    </>
  )
}
