import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function DELETE(req: Request) {
    const supabase = await createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
        }

        const { error } = await supabase
            .from("blog_posts")
            .delete()
            .eq("id", id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting post:", error)
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }
}
