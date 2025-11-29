import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This is a simplified version - you can add MDX support later
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Placeholder content - replace with actual MDX loading
    const blogData: Record<string, { title: string; date: string; content: string }> = {
        "getting-started-mlops": {
            title: "Getting Started with MLOps",
            date: "2023-10-01",
            content: "Machine Learning Operations (MLOps) is a set of practices that aims to deploy and maintain machine learning models in production reliably and efficiently."
        },
        "microsoft-fabric-review": {
            title: "Microsoft Fabric: A Game Changer?",
            date: "2023-11-15",
            content: "Exploring the new data analytics platform from Microsoft and its impact on modern data engineering."
        }
    }

    const post = blogData[slug] || { title: "Post Not Found", date: "", content: "This blog post does not exist." }

    return (
        <div className="container py-10 max-w-3xl">
            <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
            </Button>
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-muted-foreground mb-8">{post.date}</p>
            <div className="prose dark:prose-invert max-w-none">
                <p>{post.content}</p>
                <p className="mt-4 text-muted-foreground">Full blog post coming soon...</p>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    return [
        { slug: "getting-started-mlops" },
        { slug: "microsoft-fabric-review" }
    ]
}
