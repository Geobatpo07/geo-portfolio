import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export const revalidate = 60 // Revalidate every minute

export default async function BlogPage() {
    const supabase = await createClient()

    const { data: posts } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })

    return (
        <div className="container mx-auto py-12 px-4 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Thoughts, tutorials, and insights on data analytics, engineering, and web development.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts?.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                            {post.cover_image && (
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3 text-sm">
                                    {post.description}
                                </p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                {/* Add reading time calculation if available */}
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {posts?.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No posts published yet. Check back soon!</p>
                </div>
            )}
        </div>
    )
}
