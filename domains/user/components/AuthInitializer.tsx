"use client"

import { useAuthListener } from "../hooks/useAuthListener"

export const AuthInitializer = () => {
  useAuthListener()
  return null
}