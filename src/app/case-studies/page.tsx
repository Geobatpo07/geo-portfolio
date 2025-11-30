"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Tag, ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CaseStudy {
    title: string
    description: string
    date: string
    tags: string[]
    slug: string
    category: string
}

const caseStudies: CaseStudy[] = [
    {
        title: "Mathematical Modeling of Haiti's Tropical Climate",
        description: "A comprehensive study applying differential equations and numerical methods to model the tropical climate patterns of Haiti. This research explores temperature dynamics, precipitation patterns, and seasonal variations using ODE/PDE frameworks and computational simulations.",
        date: "2025-11-25",
        tags: ["Mathematics", "Climate Science", "ODE/PDE", "Scientific Computing", "Python"],
        slug: "haiti-climate-modeling",
        category: "Scientific Research"
    }
]

export default function CaseStudiesPage() {
    return (
        <div className="container py-16 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <FileText className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Case Studies</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    In-Depth <span className="gradient-text">Case Studies</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl">
                    Detailed explorations of complex data science, engineering, and mathematical modeling projects.
                    Each case study demonstrates problem-solving approaches, technical implementations, and real-world impact.
                </p>
            </motion.div>

            <div className="space-y-8">
                {/* Published Case Studies */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <Badge variant="outline" className="text-xs">
                                            {study.category}
                                        </Badge>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{study.date}</span>
                                        </div>
                                    </div>

                                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                                        {study.title}
                                    </CardTitle>

                                    <CardDescription className="line-clamp-3">
                                        {study.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span className="text-sm font-medium">Technologies</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {study.tags.map((tag, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="text-xs px-2 py-0.5"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                            asChild
                                        >
                                            <Link href={`/case-studies/${study.slug}`}>
                                                Read Case Study
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Placeholder Cards for Future Case Studies */}
                    {[1, 2].map((i) => (
                        <motion.div
                            key={`placeholder-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (caseStudies.length + i) }}
                        >
                            <Card className="h-full border-2 border-dashed hover:border-primary/30 transition-all">
                                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                                    <div className="p-4 rounded-full bg-muted mb-4">
                                        <Plus className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold mb-2">More Case Studies Coming Soon</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Additional in-depth case studies on data engineering, machine learning, and analytics projects will be published here.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="border-2 bg-gradient-to-br from-primary/5 to-purple-500/5">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-primary/10">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">What to Expect</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Each case study provides a deep dive into the problem statement, methodology, technical implementation,
                                        challenges encountered, and measurable outcomes. These studies demonstrate practical applications of
                                        data science, mathematical modeling, and engineering principles to solve real-world problems.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
