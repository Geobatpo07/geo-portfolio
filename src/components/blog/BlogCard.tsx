"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Post } from "@/lib/mdx"

interface BlogCardProps {
    post: Post
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Link href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                    <CardHeader className="p-0">
                        <div className="aspect-video w-full bg-muted/50 relative overflow-hidden">
                            {/* Placeholder for blog image - can be replaced with next/image if frontMatter has image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {post.frontMatter.tags?.slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.frontMatter.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                            {post.frontMatter.description}
                        </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{post.frontMatter.date}</span>
                            </div>
                            {/* Reading time would be calculated here or passed in */}
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    )
}
