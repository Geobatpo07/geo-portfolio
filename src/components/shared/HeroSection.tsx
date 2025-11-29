"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section className="relative container grid items-center gap-8 pb-8 pt-6 md:py-16 overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex max-w-[980px] flex-col items-start gap-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20"
                >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Available for opportunities</span>
                </motion.div>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
                    Hi, I&apos;m{" "}
                    <span className="gradient-text">Geo</span>
                    <br className="hidden sm:inline" />
                    Data Scientist & Engineer.
                </h1>

                <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                    Specializing in{" "}
                    <span className="font-semibold text-foreground">MLOps</span>,{" "}
                    <span className="font-semibold text-foreground">Big Data</span>, and{" "}
                    <span className="font-semibold text-foreground">Analytics</span>.
                    I build scalable data systems and intelligent applications that drive real-world impact.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap gap-4"
            >
                <Button asChild size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                    <Link href="/projects">
                        View Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover-lift">
                    <Link href="/about">
                        About Me
                    </Link>
                </Button>
                <Button variant="secondary" size="lg" className="hover-lift">
                    Download CV <Download className="ml-2 h-4 w-4" />
                </Button>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </section>
    )
}
