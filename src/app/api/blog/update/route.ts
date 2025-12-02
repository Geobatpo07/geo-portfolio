import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {
    const supabase = await createClient()

    // Auth is handled by middleware for /api/blog/* routes

    try {
        const body = await req.json()
        const { id, title, slug, description, content, cover_image, status } = body

        if (!id) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
        }

        const { data, error } = await supabase
            .from("blog_posts")
            .update({
                title,
                slug,
                description,
                content,
                cover_image,
                status,
                updated_at: new Date().toISOString()
            })
            .eq("id", id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error("Error updating post:", error)
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }
}
