"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section className="relative container grid items-center gap-8 pb-8 pt-6 md:py-24 overflow-hidden">
            {/* Animated background gradient - Arc Style */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-float opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-float opacity-50" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[120px] animate-pulse opacity-30" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-w-[980px] flex-col items-start gap-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                    <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
                    <span className="text-purple-100">Available for opportunities</span>
                </motion.div>

                <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl">
                    Hi, I&apos;m{" "}
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                        Geovany
                    </span>
                    <br className="hidden sm:inline" />
                    <span className="text-foreground/90">Data Science & Analytics Engineer.</span>
                </h1>

                <p className="max-w-[700px] text-xl text-muted-foreground md:text-2xl leading-relaxed">
                    Crafting intelligent systems with{" "}
                    <span className="font-semibold text-purple-400">MLOps</span>,{" "}
                    <span className="font-semibold text-blue-400">Big Data</span>, and{" "}
                    <span className="font-semibold text-pink-400">Analytics</span>.
                    Building the future of data, one pipeline at a time.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-4"
            >
                <Button asChild size="lg" className="h-12 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                    <Link href="/projects">
                        View Projects <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <Link href="/about">
                        About Me
                    </Link>
                </Button>
                <Button variant="ghost" size="lg" className="h-12 px-8 rounded-full hover:bg-white/5 transition-all duration-300">
                    Download CV <Download className="ml-2 h-5 w-5" />
                </Button>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ animationDelay: '1s' }} />
        </section>
    )
}
