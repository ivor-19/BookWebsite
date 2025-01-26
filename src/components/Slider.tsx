import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import NavMenu from "./NavMenu"
import { ThemeToggle } from "./ui/ThemeToggle"
import { AlignJustify } from "lucide-react"

export function Slider() {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    // setIsClient(true)

    if(pathName === '/'){
      setSelectedMenu(1);
      setOpen(false);
    }
    else if (pathName === '/blog'){
      setSelectedMenu(2);
      setOpen(false);
    }
    else if (pathName === '/add-book'){
      setSelectedMenu(3);
      setOpen(false);
    }
  }, [pathName])
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="hidden max-sm:block">
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <div className="flex flex-col gap-6 font-geist text-[16px] p-4">
            <Link href={'/'} onClick={() => setSelectedMenu(1)} className={`${selectedMenu === 1 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
              <span>Home</span>
            </Link>
            <Link href={'/blog'} onClick={() => setSelectedMenu(2)} className={`${selectedMenu === 2 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md`}>
              <span>Blog</span>
            </Link>
            <Link href={'/add-book'} onClick={() => setSelectedMenu(3)} className={`${selectedMenu === 3 ? 'bg-[var(--gray-foreground)]' : 'bg-transparent'} p-2 rounded-md `}>
              <span>Add Your Book</span>
            </Link>
            <NavMenu />
          </div>
        </SheetHeader>
        <SheetFooter className="w-full flex flex-row-reverse">
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
