import { createClient } from "@/utils/supabase/server"

export default async function AdminMessagesPage() {
    const supabase = await createClient()

    const { data: messages } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Messages</h1>

            <div className="space-y-4">
                {messages?.map(msg => (
                    <div key={msg.id} className="p-4 bg-white dark:bg-black border rounded-lg">
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
