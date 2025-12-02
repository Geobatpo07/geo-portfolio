import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function AdminBlogPage() {
    const supabase = await createClient()

    const { data: posts } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })

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

            <div className="border rounded-lg bg-white dark:bg-black overflow-hidden">
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
                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                    No posts found. Create your first one!
                                </TableCell>
                            </TableRow>
                        )}
                        {posts?.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">
                                    {post.title}
                                    <div className="text-xs text-muted-foreground truncate max-w-[300px]">
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
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/blog/${post.slug}`} target="_blank">
                                        <Button variant="ghost" size="icon" title="View Live">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/blog/${post.id}`}>
                                        <Button variant="ghost" size="icon" title="Edit">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    {/* Delete button would typically be a client component or form action */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
