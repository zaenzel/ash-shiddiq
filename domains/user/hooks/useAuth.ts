"use client"

import { useAuthStore } from "../store/auth.store"



export const useAuth = () => {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)

  return { user, loading }
}