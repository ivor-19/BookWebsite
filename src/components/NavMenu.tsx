"use client"
 
import * as React from "react"
import Link from "next/link" 
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function NavMenu() {
  return(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="flex flex-col gap-6">
                  <a href="#" className="flex flex-col hover:bg-[var(--gray-foreground)] p-4 rounded-md">
                    <span>Introduction</span>
                    <span className="text-[var(--secondary-text)]">Re-usable components built using Radix UI and Tailwind CSS.</span>
                  </a>
                  <a href="#" className="flex flex-col hover:bg-[var(--gray-foreground)] p-4 rounded-md">
                    <span>Installation</span>
                    <span className="text-[var(--secondary-text)]">How to install dependencies and structure your app.</span>
                  </a>
                  <a href="#" className="flex flex-col hover:bg-[var(--gray-foreground)] p-4 rounded-md">
                    <span>Typography</span>
                    <span className="text-[var(--secondary-text)]">Styles for headings, paragraphs, lists...etc</span>
                  </a>
                </li>
              </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}