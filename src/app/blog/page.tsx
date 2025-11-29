"use client"

import { blogPosts } from "@/lib/data"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function BlogPage() {
    return (
        <div className="container py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Blog</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Insights & <span className="gradient-text">Tutorials</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Thoughts and tutorials on Data Engineering, MLOps, and the latest trends in data science.
                </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full hover-lift border-2 hover:border-primary/30 transition-all duration-300 group">
                            <CardHeader>
                                <CardTitle className="group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                                <CardDescription>{post.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{post.description}</p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-primary hover:underline inline-flex items-center gap-1 font-medium group/link"
                                >
                                    Read More
                                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
