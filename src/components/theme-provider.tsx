"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import ClientOnly from "../components/utils/client-only"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <ClientOnly>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ClientOnly>
  )
}
