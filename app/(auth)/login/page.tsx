'use client'

import { AuthForm, useAuth, useLogin } from "@/domains/user"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const page = () => {
    const { error, loading: loadingLogin, login } = useLogin()
    const { user, loading } = useAuth()
    
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            router.replace("/dashboard")
        }
    }, [user, loading, router])


    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        await login(email, password)
    }

    return (
        <AuthForm typeAuth="Masuk"
            onSubmit={handleSubmit}
            loading={loadingLogin}
            error={error} />
    )
}

export default page