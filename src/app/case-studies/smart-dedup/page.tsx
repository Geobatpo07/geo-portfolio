"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, FileText } from "lucide-react"
import Link from "next/link"

export default function SmartDedupCaseStudy() {
    return (
        <div className="container py-16 max-w-4xl">
            <Button
                variant="ghost"
                asChild
                className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
            >
                <Link href="/case-studies">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                </Link>
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <Badge variant="outline">Data Engineering</Badge>

                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        SmartDedup — Intelligent Patient Record Deduplication
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>2024-06-01</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Production System Case Study</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {["Machine Learning", "Data Engineering", "Python", "FastAPI", "DuckDB"].map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Card className="border-2">
                    <CardContent className="pt-6 prose dark:prose-invert max-w-none">
                        <h2>Executive Summary</h2>
                        <p>
                            SmartDedup is a production-oriented machine learning pipeline built to identify and reconcile duplicate patient
                            records across distributed healthcare databases. The solution emphasizes precision, explainability, and
                            operational integration through a combination of active-learning models, fast preprocessing, and REST APIs.
                        </p>

                        <h2>Problem</h2>
                        <p>
                            Fragmented medical records and inconsistent identifiers cause duplicate patient entries, harming clinical
                            continuity and analytics. The goal was to design an automated, auditable deduplication pipeline that can
                            scale to large SQL Server datasets and integrate with partner systems.
                        </p>

                        <h2>Approach &amp; Architecture</h2>
                        <p>
                            The system follows a modular architecture:
                        </p>
                        <ul>
                            <li><strong>Preprocessing:</strong> Use DuckDB for fast SQL-based joins and Polars for columnar transformations.</li>
                            <li><strong>Matching Engine:</strong> `dedupe` library with custom training data and active learning loops.</li>
                            <li><strong>API Layer:</strong> FastAPI exposes match results, review endpoints, and batch processing.</li>
                            <li><strong>UI &amp; Review:</strong> Dashboards for human review, labeling, and retraining workflows.</li>
                        </ul>

                        <h2>Technical Implementation</h2>
                        <p>
                            Key implementation details include:
                        </p>
                        <ul>
                            <li>DuckDB queries to extract and join source tables from SQL Server snapshots.</li>
                            <li>Polars transformations for fast, memory-efficient cleaning and feature extraction.</li>
                            <li>Field-level similarity features (names, dates, addresses) with custom tokenization and phonetic matching.</li>
                            <li>Active learning loop where human-labeled examples are appended to `training.json` and the model is re-trained.</li>
                            <li>FastAPI endpoints for on-demand deduplication and bulk job submission.</li>
                        </ul>

                        <h2>Results</h2>
                        <ul>
                            <li>Significant reduction in duplicate rates in pilot sites (measured by precision/recall improvements).</li>
                            <li>Faster preprocessing times using DuckDB + Polars compared to previous ETL approaches.</li>
                            <li>Operational workflows for continuous labeling and model improvement.</li>
                        </ul>

                        <h2>Challenges &amp; Mitigations</h2>
                        <p>
                            Common challenges included data quality, ambiguous matches, and integrating results with downstream systems.
                            Mitigations involved conservative matching thresholds, confidence-based workflows for human review, and
                            clear auditing of decisions.
                        </p>

                        <h2>Impact &amp; Next Steps</h2>
                        <p>
                            The system improved data quality and enabled downstream analytics to rely on cleaner patient identities.
                            Future work includes embedding-based similarity models, automated retraining pipelines, and expanded
                            integration options for partner health systems.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
