"use client"

import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/shared/ProjectCard"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function ProjectsPage() {
    return (
        <div className="container py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Portfolio</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    My <span className="gradient-text">Projects</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    A collection of my work in Data Science, Engineering, and Machine Learning. Each project represents a unique challenge and learning experience.
                </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ProjectCard {...project} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
