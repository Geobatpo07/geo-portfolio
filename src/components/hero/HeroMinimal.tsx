"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export function HeroMinimal() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto">
                            Building Intelligent <br className="hidden md:block" />
                            <span className="text-muted-foreground">Data Systems.</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            I transform raw information into actionable decisions through data engineering, machine learning, and scalable architecture.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center"
                    >
                        <Button asChild size="lg" className="h-12 px-8 text-base">
                            <Link href="/projects">
                                View Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
                            <a href="https://stories.geovanylaguerre.net/cv/" target="_blank" rel="noreferrer">
                                View CV <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
