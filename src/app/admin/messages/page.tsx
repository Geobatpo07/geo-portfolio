"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useAdminAuth } from "@/hooks/useAdminAuth"

export default function AdminMessagesPage() {
    const { token } = useAdminAuth()
    const messages = useQuery(api.messages.getMessages, token ? { token } : "skip")

    if (!messages) {
        return <div className="space-y-6">
            <h1 className="text-3xl font-bold">Messages</h1>
            <div>Loading...</div>
        </div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Messages</h1>

            <div className="space-y-4">
                {messages?.map(msg => (
                    <div key={msg._id} className="p-4 bg-white dark:bg-black border rounded-lg">
                        <p><strong>Name:</strong> {msg.name}</p>
                        <p><strong>Email:</strong> {msg.email}</p>
                        <p className="mt-2 whitespace-pre-line">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            {new Date(msg.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
