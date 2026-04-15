import { getFileBySlug, getFiles } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { AuthorProfile } from "@/components/blog/AuthorProfile"
import { getReadingTime } from "@/lib/blog"
import { useMDXComponents } from "@/mdx-components"
import { notFound } from "next/navigation"
import { Metadata } from "next"

const baseUrl = "https://stories.geovanylaguerre.net"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    let post: Awaited<ReturnType<typeof getFileBySlug>> | null = null

    try {
        post = await getFileBySlug("blog", slug)
    } catch {
        return {
            title: "Blog Post | Geo's Portfolio",
        }
    }

    if (!post) {
        return {
            title: "Blog Post | Geo's Portfolio",
        }
    }

    const { frontMatter } = post
    const title = `${frontMatter.title as string} | Geo's Portfolio`
    const description = (frontMatter.description as string) || ""

    return {
        title,
        description,
        keywords: Array.isArray(frontMatter.tags) ? (frontMatter.tags as string[]) : [],
        authors: [{ name: "Geovany Batista Polo LAGUERRE" }],
        openGraph: {
            title,
            description,
            url: `${baseUrl}/blog/${slug}`,
            type: "article",
            publishedTime: frontMatter.date as string,
            authors: ["Geovany Batista Polo LAGUERRE"],
            tags: Array.isArray(frontMatter.tags) ? (frontMatter.tags as string[]) : [],
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: frontMatter.title as string,
                },
            ],
        },
        twitter: {
            title,
            description,
            card: "summary_large_image",
            images: [`${baseUrl}/og-image.png`],
        },
        alternates: {
            canonical: `${baseUrl}/blog/${slug}`,
        },
    }
}

export async function generateStaticParams() {
    const posts = await getFiles("blog")
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ""),
    }))
}

function BlogArticle({
    frontMatter,
    content,
    readingTime,
}: {
    frontMatter: Awaited<ReturnType<typeof getFileBySlug>>["frontMatter"]
    content: string
    readingTime: string
}) {
    const components = useMDXComponents({})

    return (
        <article className="max-w-3xl mx-auto xl:mx-0 w-full">
            <header className="mb-10">
                <div className="flex gap-2 mb-6">
                    {frontMatter.tags && (frontMatter.tags as string[]).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    {frontMatter.title as string}
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground border-b pb-8">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time>{frontMatter.date as string}</time>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{readingTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                </div>
            </header>

            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-p:text-muted-foreground prose-img:rounded-xl prose-pre:bg-zinc-950 prose-pre:border">
                <MDXRemote source={content} components={components} />
            </div>

            <AuthorProfile />
        </article>
    )
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let post: Awaited<ReturnType<typeof getFileBySlug>> | null = null

    try {
        post = await getFileBySlug("blog", slug)
    } catch {
        notFound()
    }

    if (!post) {
        notFound()
    }

    const { frontMatter, content } = post
    const readingTime = getReadingTime(content)

    return (
        <div className="min-h-screen pb-20">
            {/* Progress bar could go here */}

            <div className="container pt-10">
                <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary group">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                </Button>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-10">
                    <BlogArticle frontMatter={frontMatter} content={content} readingTime={readingTime} />

                    <aside className="hidden xl:block">
                        <TableOfContents />
                    </aside>
                </div>
            </div>
        </div>
    )
}
