import { format, parseISO } from "date-fns"
import { Post } from "./mdx"

export function getReadingTime(content: string): string {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const time = Math.ceil(words / wordsPerMinute)
    return `${time} min read`
}

export function formatDate(dateString: string): string {
    return format(parseISO(dateString), "MMMM d, yyyy")
}

export function getAllTags(posts: Post[]): string[] {
    const tags = new Set<string>()
    posts.forEach((post) => {
        if (post.frontMatter.tags) {
            post.frontMatter.tags.forEach((tag: string) => tags.add(tag))
        }
    })
    return Array.from(tags).sort()
}

export function getRelatedPosts(currentSlug: string, tags: string[], posts: Post[], limit = 3): Post[] {
    return posts
        .filter((post) => post.slug !== currentSlug)
        .map((post) => ({
            ...post,
            relevance: post.frontMatter.tags?.filter((tag: string) => tags.includes(tag)).length || 0,
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, limit)
}
