"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const { token, isLoading } = useAdminAuth()
    const router = useRouter()
    const stats = useQuery(api.messages.getMessageStats, token ? { token } : "skip")

    useEffect(() => {
        if (!isLoading && !token) {
            router.push("/admin/login")
        }
    }, [isLoading, token, router])

    if (isLoading || !token) {
        return <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div>Loading...</div>
        </div>
    }

    if (!stats) {
        return <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div>Loading stats...</div>
        </div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-black border rounded-lg">
                    <h2 className="text-lg font-semibold">Total Messages</h2>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>

                <div className="p-6 bg-white dark:bg-black border rounded-lg col-span-2">
                    <h2 className="text-lg font-semibold mb-2">Messages per Month</h2>
                    <pre className="text-sm text-muted-foreground">
                        {JSON.stringify(stats.perMonth, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}
