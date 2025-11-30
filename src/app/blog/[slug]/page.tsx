import { getFileBySlug, getFiles } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { AuthorProfile } from "@/components/blog/AuthorProfile"
import { getReadingTime, formatDate } from "@/lib/blog"
import { useMDXComponents } from "@/mdx-components"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"

export async function generateStaticParams() {
    const posts = await getFiles("blog")
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ""),
    }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { frontMatter, content } = await getFileBySlug("blog", slug)
    const readingTime = getReadingTime(content)

    // Use custom components
    const components = useMDXComponents({})

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
                            <MDXRemote
                                source={content}
                                components={components}
                                options={{
                                    mdxOptions: {
                                        rehypePlugins: [
                                            // @ts-ignore
                                            rehypeSlug,
                                            // @ts-ignore
                                            [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                            // @ts-ignore
                                            [rehypePrettyCode, { theme: "github-dark" }]
                                        ]
                                    }
                                }}
                            />
                        </div>

                        <AuthorProfile />
                    </article>

                    <aside className="hidden xl:block">
                        <TableOfContents />
                    </aside>
                </div>
            </div>
        </div>
    )
}
