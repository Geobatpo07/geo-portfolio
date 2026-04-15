"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { MarkdownEditor } from "@/components/admin/MarkdownEditor"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import type { Doc } from "../../../convex/_generated/dataModel"
import { useAdminAuth } from "@/hooks/useAdminAuth"

interface BlogPostFormProps {
    initialData?: Doc<"blog_posts">
}

export function BlogPostForm({ initialData }: BlogPostFormProps) {
    const router = useRouter()
    const createPost = useMutation(api.blog.createPost)
    const updatePost = useMutation(api.blog.updatePost)
    const { token } = useAdminAuth()

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(initialData?.title || "")
    const [slug, setSlug] = useState(initialData?.slug || "")
    const [description, setDescription] = useState(initialData?.description || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [coverImage, setCoverImage] = useState(initialData?.cover_image || "")
    const [isPublished, setIsPublished] = useState(initialData?.status === "published")

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        setTitle(newTitle)
        if (!initialData) {
            setSlug(generateSlug(newTitle))
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            if (initialData) {
                await updatePost({
                    id: initialData._id,
                    title,
                    slug,
                    description,
                    content,
                    cover_image: coverImage,
                    status: isPublished ? "published" : "draft",
                    token,
                })
            } else {
                await createPost({
                    title,
                    slug,
                    description,
                    content,
                    cover_image: coverImage,
                    status: isPublished ? "published" : "draft",
                    token,
                })
            }
            router.push("/admin/blog")
            router.refresh()
        } catch (error) {
            console.error("Failed to save post:", error)
            alert("Failed to save post")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">
                        {initialData ? "Edit Post" : "New Post"}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isPublished}
                            onCheckedChange={setIsPublished}
                        />
                        <Label>Published</Label>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                </div>
            </div>

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Post title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="post-url-slug"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description for SEO and previews"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Content</Label>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <ImageUpload
                            value={coverImage}
                            onChange={setCoverImage}
                            onRemove={() => setCoverImage("")}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
