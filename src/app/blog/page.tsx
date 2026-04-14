import { getAllFilesFrontMatter } from "@/lib/mdx"
import BlogPageClient from "@/components/blog/BlogPageClient"

export default async function BlogPage() {
    const posts = await getAllFilesFrontMatter("blog")

    const normalizedPosts = posts
        .map((post) => ({
            slug: post.slug,
            frontMatter: {
                title: String(post.title ?? ""),
                date: String(post.date ?? ""),
                description: String(post.description ?? ""),
                tags: Array.isArray(post.tags) ? post.tags : ["Data Science", "Engineering"],
            },
            content: "",
        }))
        .sort((a, b) => {
            const dateA = new Date(String(a.frontMatter.date)).getTime()
            const dateB = new Date(String(b.frontMatter.date)).getTime()
            return dateB - dateA
        })

    return <BlogPageClient posts={normalizedPosts} />
}
