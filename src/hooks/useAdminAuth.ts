"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAdminAuth() {
    const [token, setToken] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const stored = localStorage.getItem("admin_token")
        if (stored) {
            setToken(stored)
        }
        setIsLoading(false)
    }, [])

    const login = (newToken: string) => {
        localStorage.setItem("admin_token", newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("admin_token")
        setToken(undefined)
        router.push("/admin/login")
    }

    return { token, isLoading, login, logout }
}
