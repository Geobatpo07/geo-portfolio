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
import { createClient } from "@/utils/supabase/client"

interface BlogPostFormProps {
    initialData?: any
}

export function BlogPostForm({ initialData }: BlogPostFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        content: initialData?.content || "",
        cover_image: initialData?.cover_image || "",
        status: initialData?.status || "draft",
    })

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData((prev) => ({
            ...prev,
            title,
            slug: !initialData ? generateSlug(title) : prev.slug,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const endpoint = initialData ? "/api/blog/update" : "/api/blog/create"
            const dataToSave = {
                ...formData,
                ...(initialData && { id: initialData.id }),
            }

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to save post")
            }

            router.push("/admin/blog")
            router.refresh()
        } catch (error) {
            console.error("Error saving post:", error)
            alert(`Failed to save post: ${error instanceof Error ? error.message : "Unknown error"}`)
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
                            checked={formData.status === "published"}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, status: checked ? "published" : "draft" })
                            }
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
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Post title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="post-url-slug"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Short description for SEO and previews"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Content</Label>
                        <MarkdownEditor
                            value={formData.content}
                            onChange={(value) => setFormData({ ...formData, content: value })}
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <ImageUpload
                            value={formData.cover_image}
                            onChange={(url) => setFormData({ ...formData, cover_image: url })}
                            onRemove={() => setFormData({ ...formData, cover_image: "" })}
                        />
                    </div>

                    {/* Tags could go here later */}
                </div>
            </div>
        </form>
    )
}
