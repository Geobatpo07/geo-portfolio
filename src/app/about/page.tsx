"use client"

import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Target, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const certifications = [
    "Google Data Analytics Professional Certificate",
    "Google Business Intelligence Professional Certificate",
    "Microsoft Certified: Fabric Analytics Engineer Associate",
    "Microsoft Certified: Fabric Data Engineer Associate",
    "Apache Spark SQL for Data Analysts",
    "Microsoft SQL Server Database Design Masterclass"
]

const goals = [
    "Expanding mastery of Data Science and advanced Machine Learning",
    "Mastering MLOps for productionizing, deploying, and monitoring ML models",
    "Deepening expertise in Big Data: Spark, PySpark, KQL, Lakehouse & Fabric",
    "Building scalable ML-driven systems like Recommender Engines & SmartDedup",
    "Developing high-performance pipelines with DuckDB, Polars, and Arrow",
    "Advancing research in mathematical modeling & scientific computing (ODE/PDE)",
    "Mentoring and teaching future data professionals through academic engagement"
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
                    Data Science & Analytics Engineer with strong mathematical foundations and hands-on experience in data pipelines, analytics, machine learning, and scientific computing.
                    I’m passionate about bridging rigorous mathematics with real-world data systems that support strategic decision-making.
                </p>
            </motion.div>

            <Separator className="my-12" />

            <div className="grid gap-12 lg:grid-cols-2">
                
                {/* LEFT COLUMN */}
                <div className="space-y-8">

                    {/* BACKGROUND */}
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
                                    My journey began with a deep passion for mathematics, which evolved into applied modeling, scientific computing, and later into data science and engineering.
                                    This unique blend enables me to approach data problems with analytical rigor and engineering precision.
                                </p>

                                <p>
                                    Today, I am a <strong>Data Analyst at Solutions S.A.</strong>, where I design and maintain ETL pipelines, build real-time dashboards, develop analytics applications in Java, Python, and .NET, 
                                    and support the development of <strong>RADAR</strong>, the company’s BI & reporting platform.
                                    I work daily with SQL Server, Microsoft Fabric, and Power BI to deliver insights that support strategic and operational decision-making.
                                </p>

                                <p>
                                    Alongside my industry work, I am also a <strong>Lecturer in Mathematics</strong> at Université Quisqueya (UniQ), and a <strong>Teaching Assistant in Data Science & AI</strong>,
                                    where I mentor students on Python, SQL, statistics, machine learning, and visualization.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* GOALS */}
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

                {/* RIGHT COLUMN */}
                <div className="space-y-8">

                    {/* EDUCATION */}
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
                                        <h3 className="font-semibold text-lg">
                                            Master of Science – Mathematics & Applications  
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Université des Antilles • Modeling & Decision-Making Tools Track (2024–2026)
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                        <h3 className="font-semibold text-lg">
                                            Bachelor of Science – Mathematics
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            École Normale Supérieure, UEH (2021–2022)
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                        <h3 className="font-semibold text-lg">
                                            Engineer’s Degree – Civil Engineering
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Faculté des Sciences, UEH (2017–2022)
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                        <h3 className="font-semibold text-lg">
                                            MicroMasters – MITx Statistics & Data Science (Methods Track)
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            MITx Online (2024)
                                        </p>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CERTIFICATIONS */}
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
                                                    <Badge
                                                        variant="secondary"
                                                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                                    >
                                                        ✓
                                                    </Badge>
                                                </div>

                                                <div>
                                                    <h3 className="font-medium group-hover:text-primary transition-colors">
                                                        {cert}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {cert.includes("Google")
                                                            ? "Google"
                                                            : cert.includes("Microsoft")
                                                            ? "Microsoft"
                                                            : "Certification"}
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
