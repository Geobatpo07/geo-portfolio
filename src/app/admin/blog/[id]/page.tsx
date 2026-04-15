"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { BlogPostForm } from "@/components/admin/BlogPostForm"
import { useAdminAuth } from "@/hooks/useAdminAuth"

interface EditPostPageProps {
    params: {
        id: string
    }
}

export default function EditPostPage({ params }: EditPostPageProps) {
    const router = useRouter()
    const { token, isLoading } = useAdminAuth()
    const postId = params.id as Id<"blog_posts">
    const post = useQuery(api.blog.getPostById, token ? { id: postId, token } : "skip")

    useEffect(() => {
        if (!isLoading && !token) {
            router.push("/admin/login")
        }
    }, [isLoading, token, router])

    if (isLoading || !token) {
        return <div>Loading...</div>
    }

    if (post === null) {
        return <div>Post not found.</div>
    }

    if (!post) {
        return <div>Loading...</div>
    }

    return <BlogPostForm initialData={post} />
}
