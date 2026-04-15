"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdminAuth } from "@/hooks/useAdminAuth"

export default function AdminBlogPage() {
    const router = useRouter()
    const { token, isLoading } = useAdminAuth()
    const posts = useQuery(api.blog.getAllPosts, token ? { token } : "skip")

    useEffect(() => {
        if (!isLoading && !token) {
            router.push("/admin/login")
        }
    }, [isLoading, token, router])

    if (isLoading || !token) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <div>Loading...</div>
            </div>
        )
    }

    if (!posts) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <div>Loading posts...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Link href="/admin/blog/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border bg-white dark:bg-black">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                                    No posts found. Create your first one!
                                </TableCell>
                            </TableRow>
                        )}
                        {posts?.map((post) => (
                            <TableRow key={post._id}>
                                <TableCell className="font-medium">
                                    {post.title}
                                    <div className="max-w-[300px] truncate text-xs text-muted-foreground">
                                        {post.slug}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                                        {post.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <Link href={`/blog/${post.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon" title="View Live">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/blog/${post._id}`}>
                                        <Button variant="ghost" size="icon" title="Edit">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
