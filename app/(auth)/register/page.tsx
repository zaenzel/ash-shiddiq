"use client"

import { AuthForm, useAuth } from "@/domains/user"
import { useRegister } from "@/domains/user/hooks/useRegiter"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterPage() {
  const { register, loading, error } = useRegister()

  const router = useRouter()

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    await register(email, password)
    router.push("/login")
  }

  return (
    <AuthForm
      typeAuth="Daftar"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  )
}