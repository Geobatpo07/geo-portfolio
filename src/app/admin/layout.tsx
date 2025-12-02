import { createClient } from "@/utils/supabase/server"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Middleware handles authentication, no need to check here
    return (
        <div className="min-h-screen bg-muted/20 p-6">
            {children}
        </div>
    )
}
