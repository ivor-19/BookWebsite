"use client"

import * as React from "react"

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Render nothing on the server side until the client mounts
  if (!mounted) return null

  return <>{children}</>
}

export default ClientOnly
