"use client"

import { Button } from "@/components/ui/button"
import { useLogout } from "@/domains/user"
import { ROUTES } from "@/shared/routes"
import { useModalStore } from "@/shared/store"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { openModal } = useModalStore()
  const { loading, logout } = useLogout()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push(ROUTES.LOGIN)
  }

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 md:px-6">
      <h1 className="text-sm font-medium">
        Dashboard
      </h1>

      <Button
        onClick={handleLogout}
        variant={'destructive'}
        disabled={loading}
      >
        {
          loading ? 'Loading..' : 'Logout'

        }
      </Button>

      <Button className="cursor-pointer lg:hidden" onClick={() => openModal('NAVIGATION_MODAL')}>
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  )
}