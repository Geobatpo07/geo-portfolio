"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function BlogHero() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20 mb-6">
                        <Sparkles className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-primary">The Blog</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Thoughts, Insights & <span className="gradient-text">Experiments</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Deep dives into data science, engineering, and real-world applications.
                        Exploring the intersection of math, code, and business value.
                    </p>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -z-10 opacity-30">
                <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute top-40 right-60 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>
        </section>
    )
}
