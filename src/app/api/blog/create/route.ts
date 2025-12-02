import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: Request) {
    const supabase = await createClient()

    // Auth is handled by middleware for /api/blog/* routes

    try {
        const body = await req.json()
        const { title, slug, description, content, cover_image, status } = body

        if (!title || !slug) {
            return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
        }

        const { data, error } = await supabase
            .from("blog_posts")
            .insert([{
                title,
                slug,
                description,
                content,
                cover_image,
                status,
                updated_at: new Date().toISOString()
            }])
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error("Error creating post:", error)
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }
}
