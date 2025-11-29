"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    demoLink?: string
    githubLink?: string
    slug: string
}

export function ProjectCard({ title, description, tags, demoLink, githubLink, slug }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Card className="flex flex-col h-full hover-lift border-2 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative">
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
                    <CardDescription className="line-clamp-2">{description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 relative">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between relative">
                    <Button variant="link" className="p-0 group/link" asChild>
                        <Link href={`/projects/${slug}`} className="flex items-center gap-1">
                            Read Case Study
                            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        {githubLink && (
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </Button>
                        )}
                        {demoLink && (
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">Live Demo</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
