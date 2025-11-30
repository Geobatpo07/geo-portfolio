"use client"

import { BlogHero } from "@/components/blog/BlogHero"
import { SearchFilter } from "@/components/blog/SearchFilter"
import { BlogCard } from "@/components/blog/BlogCard"
import { blogPosts } from "@/lib/data"
import { getAllTags } from "@/lib/blog"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { use } from "react"

// Convert data to Post type structure for compatibility
const posts = blogPosts.map(post => ({
    slug: post.slug,
    frontMatter: {
        title: post.title,
        date: post.date,
        description: post.description,
        tags: post.tags,
    },
    content: ""
}))

export default function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = use(params)
    const router = useRouter()
    const decodedTag = decodeURIComponent(tag)

    const allTags = getAllTags(posts)

    const filteredPosts = posts.filter(post =>
        post.frontMatter.tags?.includes(decodedTag)
    )

    const handleSearch = (query: string) => {
        // Redirect to main blog page for search since this is a specific tag view
        if (query) {
            router.push(`/blog?search=${query}`)
        }
    }

    const handleTagSelect = (selectedTag: string | null) => {
        if (selectedTag) {
            router.push(`/blog/tag/${selectedTag}`)
        } else {
            router.push('/blog')
        }
    }

    return (
        <div className="min-h-screen pb-20">
            <BlogHero />

            <div className="container relative z-10 -mt-20">
                <div className="bg-background/80 backdrop-blur-xl rounded-3xl border shadow-2xl p-8 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Posts tagged with <span className="text-primary">#{decodedTag}</span></h2>
                        <p className="text-muted-foreground">Found {filteredPosts.length} articles</p>
                    </div>

                    <SearchFilter
                        tags={allTags}
                        onSearch={handleSearch}
                        onTagSelect={handleTagSelect}
                        selectedTag={decodedTag}
                    />

                    <motion.div
                        layout
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence>
                            {filteredPosts.map((post) => (
                                <motion.div
                                    key={post.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <BlogCard post={post} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No posts found with this tag.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
