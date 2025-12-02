"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLoginPage() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: any) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        setLoading(false)

        if (res.ok) {
            window.location.href = "/admin/dashboard"
        } else {
            setError("Invalid credentials")
        }
    }

    return (
        <div className="flex justify-center mt-24 px-4">
            <Card className="w-full max-w-sm border-2 shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Admin Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input name="email" placeholder="Email" required />
                        <Input name="password" type="password" placeholder="Password" required />

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <Button disabled={loading} type="submit" className="w-full">
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
