import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This is a simplified version - you can add MDX support later
export default async function ProjectPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Placeholder content - replace with actual MDX loading
    const projectData: Record<string, { title: string; tags: string[]; content: string }> = {
        "recommender-system": {
            title: "Recommender System using Goodbooks-10k",
            tags: ["Python", "Machine Learning", "Scikit-Learn"],
            content: "A collaborative filtering recommender system built with Python and Scikit-Learn using the Goodbooks-10k dataset."
        },
        "powerbi-fabric": {
            title: "Power BI Real-Time Analytics with Fabric",
            tags: ["Power BI", "Microsoft Fabric", "Real-Time"],
            content: "Real-time dashboarding solution leveraging Microsoft Fabric for data ingestion and Power BI for visualization."
        },
        "cyclone-modeling": {
            title: "Cyclone Modeling using ODE/PDE",
            tags: ["Math", "Python", "Modeling"],
            content: "Mathematical modeling of cyclone paths using Ordinary and Partial Differential Equations."
        },
        "smart-dedup": {
            title: "SmartDedup",
            tags: ["Machine Learning", "Data Engineering", "Python"],
            content: "Intelligent data deduplication system using machine learning techniques to identify duplicate records."
        }
    }

    const project = projectData[slug] || { title: "Project Not Found", tags: [], content: "This project does not exist." }

    return (
        <div className="container py-10 max-w-3xl">
            <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/projects">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Link>
            </Button>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex gap-2 mb-8">
                {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <div className="prose dark:prose-invert max-w-none">
                <p>{project.content}</p>
                <p className="mt-4 text-muted-foreground">Full project documentation coming soon...</p>
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
