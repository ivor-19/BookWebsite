"use client"
 
import * as React from "react"
import Link from "next/link" 

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useRouter } from "next/navigation"
import { Loading } from "./Loading"
import { useAuth } from "@/context/AuthContext"
import axios from '@/utils/axios'
import Skeleton from "react-loading-skeleton"

export default function NavMenu() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { user, setUserData } = useAuth();

  const handleLogout = async () => {
    try{
      const response = await axios.post('/api/auth/logout');

      if(response.data.isSuccess){
        setLoading(true);
        console.log('Logout');
        setTimeout(() => {
         
          setUserData(null);
        }, 3000)
      }
      else{
        console.error(response.data.error);
      }
    }
    catch(error){
      console.error('Failed in logging out', error);
    }
  }

  return(
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{user?.username || '*****'}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] max-md:w-[200px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href=""
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and
                          Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="flex flex-col gap-6">
                    <Link href="" className="flex flex-col hover:bg-[var(--gray-foreground)] p-4 rounded-md">
                      <span>Introduction</span>
                      <span className="text-[var(--secondary-text)]">Re-usable components built using Radix UI and Tailwind CSS.</span>
                    </Link>
                    <Link href="" className="flex flex-col hover:bg-[var(--gray-foreground)] p-4 rounded-md">
                      <span>Installation</span>
                      <span className="text-[var(--secondary-text)]">How to install dependencies and structure your app.</span>
                    </Link>
                    <a onClick={handleLogout} className="flex flex-col hover:bg-[var(--gray-foreground)] p-4 rounded-md cursor-pointer">
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Loading open={loading} setOpen={setLoading} note={'Logging Out'}/>
    </>
  )
}