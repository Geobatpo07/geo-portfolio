import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { Metadata } from "next"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const supabase = await createClient()
    const { data: post } = await supabase
        .from("blog_posts")
        .select("title, description, cover_image")
        .eq("slug", params.slug)
        .single()

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description || "",
            images: post.cover_image ? [post.cover_image] : [],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const supabase = await createClient()

    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", params.slug)
        .eq("status", "published")
        .single()

    if (!post) {
        notFound()
    }

    return (
        <article className="container mx-auto py-12 px-4 max-w-4xl">
            <Link href="/blog">
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Button>
            </Link>

            <header className="space-y-6 mb-12 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                    {post.title}
                </h1>

                {post.description && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {post.description}
                    </p>
                )}
            </header>

            {post.cover_image && (
                <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden border bg-muted">
                    <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose dark:prose-invert prose-lg max-w-none mx-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content || ""}
                </ReactMarkdown>
            </div>
        </article>
    )
}
