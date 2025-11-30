"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Database, Code, BarChart, Server, Layout, Brain } from "lucide-react"

const skills = {
    languages: [
        { name: "Python", icon: Code, level: "Expert" },
        { name: "SQL", icon: Database, level: "Expert" },
        { name: "TypeScript", icon: Layout, level: "Advanced" },
        { name: "R", icon: BarChart, level: "Intermediate" },
    ],
    data: [
        { name: "DuckDB", icon: Database, level: "Advanced" },
        { name: "Polars", icon: BarChart, level: "Advanced" },
        { name: "SQL Server", icon: Server, level: "Expert" },
        { name: "Fabric", icon: Database, level: "Intermediate" },
        { name: "Power BI", icon: BarChart, level: "Expert" },
    ],
    ml: [
        { name: "PyTorch", icon: Brain, level: "Intermediate" },
        { name: "Scikit-learn", icon: Brain, level: "Advanced" },
        { name: "TensorFlow", icon: Brain, level: "Intermediate" },
    ],
    web: [
        { name: "Next.js", icon: Layout, level: "Advanced" },
        { name: "React", icon: Layout, level: "Advanced" },
        { name: "Tailwind", icon: Layout, level: "Expert" },
    ]
}

export function SkillsSection() {
    const [activeTab, setActiveTab] = useState("all")

    const allSkills = Object.values(skills).flat()

    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Arsenal</h2>
                    <p className="text-muted-foreground max-w-[700px]">
                        My toolkit for building scalable data solutions and modern web applications.
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-5 mb-8">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="languages">Languages</TabsTrigger>
                        <TabsTrigger value="data">Data</TabsTrigger>
                        <TabsTrigger value="ml">ML/AI</TabsTrigger>
                        <TabsTrigger value="web">Web</TabsTrigger>
                    </TabsList>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <AnimatePresence mode="popLayout">
                            {(activeTab === "all" ? allSkills : skills[activeTab as keyof typeof skills] || []).map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card className="p-6 flex flex-col items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-primary/10 bg-background/50 backdrop-blur-sm group cursor-default">
                                        <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                            <skill.icon className="h-8 w-8 text-primary/70 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold">{skill.name}</h3>
                                            <span className="text-xs text-muted-foreground">{skill.level}</span>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}
