"use client"

import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Target, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const certifications = [
    "Google Data Analytics Professional Certificate",
    "Google Business Intelligence Professional Certificate",
    "Microsoft Certified: Fabric Analytics Engineer Associate"
]

const goals = [
    "Mastering MLOps practices for productionizing ML models",
    "Deepening knowledge in Big Data technologies like Spark and Fabric",
    "Building advanced Recommender Systems",
    "Contributing to open-source data projects"
]

export default function AboutPage() {
    return (
        <div className="container py-16 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">About Me</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Building the Future with <span className="gradient-text">Data</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Data Scientist & Engineer with a passion for building scalable systems that transform raw data into actionable insights.
                </p>
            </motion.div>

            <Separator className="my-12" />

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Background</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    I am a dedicated Data Scientist and Engineer with a strong foundation in Mathematics and Computer Science.
                                    My journey began with a Bachelor&apos;s in Applied & Fundamental Mathematics, which gave me the analytical tools to understand complex systems.
                                </p>
                                <p>
                                    I have since transitioned into the world of Data Engineering and Machine Learning, where I apply these concepts to build robust data pipelines and intelligent applications that solve real-world problems.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Current Goals</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {goals.map((goal, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3 text-muted-foreground"
                                        >
                                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                            <span>{goal}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Education</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                        <h3 className="font-semibold text-lg">Bachelor in Applied & Fundamental Mathematics</h3>
                                        <p className="text-sm text-muted-foreground mt-1">University Name • Year</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-2 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Certifications</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {certifications.map((cert, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group cursor-default"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1">
                                                    <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                        ✓
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium group-hover:text-primary transition-colors">{cert}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {cert.includes("Google") ? "Google" : "Microsoft"}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
