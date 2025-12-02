import { createClient } from "@/utils/supabase/server"
import { BlogPostForm } from "@/components/admin/BlogPostForm"
import { notFound } from "next/navigation"

interface EditPostPageProps {
    params: {
        id: string
    }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const supabase = await createClient()

    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single()

    if (!post) {
        notFound()
    }

    return <BlogPostForm initialData={post} />
}
