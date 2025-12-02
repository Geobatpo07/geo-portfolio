import { createClient } from "@/utils/supabase/server"

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: messages } = await supabase
        .from("contact_messages")
        .select("*")

    const total = messages?.length || 0

    const perMonth = messages?.reduce((acc: any, msg) => {
        const month = new Date(msg.created_at).toLocaleString("default", { month: "short", year: "numeric" })
        acc[month] = (acc[month] || 0) + 1
        return acc
    }, {})

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-black border rounded-lg">
                    <h2 className="text-lg font-semibold">Total Messages</h2>
                    <p className="text-3xl font-bold">{total}</p>
                </div>

                <div className="p-6 bg-white dark:bg-black border rounded-lg col-span-2">
                    <h2 className="text-lg font-semibold mb-2">Messages per Month</h2>
                    <pre className="text-sm text-muted-foreground">
                        {JSON.stringify(perMonth, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}
