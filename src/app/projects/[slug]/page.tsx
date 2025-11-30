import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This is a simplified version — MDX support can be added later
export default async function ProjectPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // 💡 Updated project descriptions based on your real experience
    const projectData: Record<
        string,
        { title: string; tags: string[]; content: string }
    > = {
        "recommender-system": {
            title: "Recommender System using Goodbooks-10k",
            tags: ["Python", "PyTorch", "Scikit-Learn", "Machine Learning"],
            content:
                "This project explores collaborative filtering, matrix factorization, and deep learning models to build a high-quality recommender system using the Goodbooks-10k dataset. The system includes data preprocessing with Pandas/Polars, feature engineering, model evaluation with RMSE, and a neural recommender implemented with PyTorch. The long-term goal is to deploy the system behind a FastAPI service and expose recommendations through a Next.js interface."
        },

        "powerbi-fabric": {
            title: "Power BI Real-Time Analytics with Microsoft Fabric",
            tags: ["Power BI", "Microsoft Fabric", "KQL", "Real-Time", "Data Engineering"],
            content:
                "A real-time analytics pipeline built using Microsoft Fabric’s Eventstreams and KQL databases. This project ingests live data, transforms it using Fabric pipelines, and delivers real-time dashboards in Power BI for operational monitoring. It showcases your expertise in the new Microsoft Fabric ecosystem, including Lakehouses, KQL databases, semantic models, and producing enterprise-ready BI solutions."
        },

        "cyclone-modeling": {
            title: "Cyclone Modeling using ODE/PDE Simulation",
            tags: ["Mathematics", "Python", "ODE", "PDE", "Scientific Computing"],
            content:
                "A research project completed during my M1 research internship. It models cyclones using numerical methods applied to Ordinary and Partial Differential Equations. The work includes implementing Lax–Friedrichs schemes, solving initial value problems (IVP), validating multiple numerical solvers (BDF, Euler implicit, theta-method), and conducting asymptotic analysis near the cyclone’s eye. Visualizations were generated using Python, Matplotlib, and custom computation utilities."
        },

        "smart-dedup": {
            title: "SmartDedup — Intelligent Patient Record Deduplication",
            tags: ["Machine Learning", "Python", "Data Engineering", "FastAPI", "DuckDB"],
            content:
                "SmartDedup is a production-oriented machine learning system designed to identify duplicate patient medical records in SQL Server databases. It uses the `dedupe` library with custom training data, active learning, and field-level similarity modeling. The system integrates DuckDB for fast preprocessing, Polars for optimized data handling, and FastAPI to expose deduplicated records to other medical systems such as SALVH and PLR. It also includes dashboards for model training, duplicate visualization, and data quality monitoring. This is one of my flagship engineering projects."
        }
    }

    const project =
        projectData[slug] || {
            title: "Project Not Found",
            tags: [],
            content: "This project does not exist."
        }

    return (
        <div className="container py-10 max-w-3xl">
            <Button
                variant="ghost"
                asChild
                className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
            >
                <Link href="/projects">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Link>
            </Button>

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

            <div className="flex gap-2 mb-8">
                {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <p>{project.content}</p>

                <p className="mt-4 text-muted-foreground">
                    Full project documentation coming soon...
                </p>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    return [
        { slug: "recommender-system" },
        { slug: "powerbi-fabric" },
        { slug: "cyclone-modeling" },
        { slug: "smart-dedup" }
    ]
}
