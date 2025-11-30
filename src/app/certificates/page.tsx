"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Certificate {
    title: string
    issuer: string
    date: string
    credentialId?: string
    credentialUrl?: string
    skills: string[]
    category: "Data Analytics" | "Data Engineering" | "Machine Learning" | "Cloud & BI" | "Programming"
}

const certificates: Certificate[] = [
    {
        title: "Google Data Analytics Professional Certificate",
        issuer: "Google",
        date: "2023",
        skills: ["Data Analysis", "SQL", "Data Visualization", "Spreadsheets", "R"],
        category: "Data Analytics"
    },
    {
        title: "Google Business Intelligence Professional Certificate",
        issuer: "Google",
        date: "2023",
        skills: ["Business Intelligence", "Data Modeling", "Dashboards", "ETL", "Stakeholder Management"],
        category: "Data Analytics"
    },
    {
        title: "Microsoft Certified: Fabric Analytics Engineer Associate",
        issuer: "Microsoft",
        date: "2024",
        skills: ["Microsoft Fabric", "Lakehouse", "Data Pipelines", "Power BI", "KQL"],
        category: "Cloud & BI"
    },
    {
        title: "Microsoft Certified: Fabric Data Engineer Associate",
        issuer: "Microsoft",
        date: "2024",
        skills: ["Data Engineering", "Fabric", "Spark", "Delta Lake", "Data Governance"],
        category: "Data Engineering"
    },
    {
        title: "Apache Spark SQL for Data Analysts",
        issuer: "Databricks",
        date: "2024",
        skills: ["Spark SQL", "Big Data", "Distributed Computing", "Data Analysis"],
        category: "Data Engineering"
    },
    {
        title: "Microsoft SQL Server Database Design Masterclass",
        issuer: "Udemy",
        date: "2023",
        skills: ["SQL Server", "Database Design", "Normalization", "Indexing", "Performance Tuning"],
        category: "Data Engineering"
    },
    {
        title: "MITx MicroMasters - Statistics & Data Science (Methods Track)",
        issuer: "MITx Online",
        date: "2024",
        skills: ["Statistics", "Probability", "Machine Learning", "Python", "Data Science"],
        category: "Machine Learning"
    }
]

const categories = Array.from(new Set(certificates.map(cert => cert.category)))

export default function CertificatesPage() {
    return (
        <div className="container py-16 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-12"
            >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm bg-primary/10 border-primary/20">
                    <Award className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-primary">Professional Certifications</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Certifications & <span className="gradient-text">Credentials</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl">
                    A collection of professional certifications demonstrating expertise across data analytics, engineering, machine learning, and cloud technologies.
                </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-12"
            >
                {categories.map((category) => (
                    <Badge
                        key={category}
                        variant="secondary"
                        className="px-4 py-2 text-sm cursor-default hover:bg-primary/10 transition-colors"
                    >
                        {category}
                    </Badge>
                ))}
            </motion.div>

            {/* Certificates Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <Award className="h-5 w-5 text-primary" />
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {cert.category}
                                    </Badge>
                                </div>

                                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                    {cert.title}
                                </CardTitle>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                    <Building2 className="h-3.5 w-3.5" />
                                    <span>{cert.issuer}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{cert.date}</span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Skills Covered</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cert.skills.map((skill, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="text-xs px-2 py-0.5"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {cert.credentialUrl && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                            asChild
                                        >
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Credential
                                                <ExternalLink className="ml-2 h-3.5 w-3.5" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 grid gap-6 md:grid-cols-3"
            >
                <Card className="border-2 bg-gradient-to-br from-primary/5 to-purple-500/5">
                    <CardContent className="pt-6 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                            {certificates.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Professional Certifications
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                    <CardContent className="pt-6 text-center">
                        <div className="text-4xl font-bold text-blue-500 mb-2">
                            {categories.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Specialized Areas
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                    <CardContent className="pt-6 text-center">
                        <div className="text-4xl font-bold text-green-500 mb-2">
                            {Array.from(new Set(certificates.flatMap(c => c.skills))).length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Technical Skills
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
