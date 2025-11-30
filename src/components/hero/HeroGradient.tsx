"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroGradient() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,hsl(var(--primary))_360deg)] opacity-10 blur-3xl"
                />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            Available for new opportunities
                        </div>
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                            Data Science <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                Redefined.
                            </span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Crafting robust ML pipelines and intuitive analytics dashboards to drive business growth.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity border-0">
                                <Link href="/projects">
                                    Explore Work <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg">
                                <Link href="/contact">Contact Me</Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative mx-auto w-full max-w-[500px] aspect-square lg:aspect-auto lg:h-[500px] bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-3xl backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                        <div className="relative z-10 text-center p-8">
                            <div className="text-6xl font-bold mb-4">98%</div>
                            <div className="text-xl text-muted-foreground">Model Accuracy</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
