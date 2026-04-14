"use client"

import { useMemo, useState, useCallback } from "react"
import { BlogHero } from "@/components/blog/BlogHero"
import { SearchFilter } from "@/components/blog/SearchFilter"
import { BlogCard } from "@/components/blog/BlogCard"
import { getAllTags } from "@/lib/blog"
import { Post } from "@/lib/mdx"
import { motion, AnimatePresence } from "framer-motion"

interface BlogPageClientProps {
    posts: Post[]
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
    const [query, setQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    const allTags = useMemo(() => getAllTags(posts), [posts])

    const filteredPosts = useMemo(() => {
        const lowerQuery = query.toLowerCase()

        return posts.filter((post) => {
            const title = String(post.frontMatter.title ?? "").toLowerCase()
            const description = String(post.frontMatter.description ?? "").toLowerCase()
            const matchesSearch = !lowerQuery || title.includes(lowerQuery) || description.includes(lowerQuery)
            const matchesTag = selectedTag
                ? Array.isArray(post.frontMatter.tags) && post.frontMatter.tags.includes(selectedTag)
                : true

            return matchesSearch && matchesTag
        })
    }, [posts, query, selectedTag])

    const handleSearch = useCallback((newQuery: string) => {
        setQuery(newQuery)
    }, [])

    const handleTagSelect = useCallback((tag: string | null) => {
        setSelectedTag(tag)
    }, [])

    return (
        <div className="min-h-screen pb-20">
            <BlogHero />

            <div className="container relative z-10 -mt-20">
                <div className="bg-background/80 backdrop-blur-xl rounded-3xl border shadow-2xl p-8 md:p-12">
                    <SearchFilter
                        tags={allTags}
                        onSearch={handleSearch}
                        onTagSelect={handleTagSelect}
                        selectedTag={selectedTag}
                    />

                    <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                            No posts found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}