export const skills = {
    programming: ["Python", "R", "SQL", "Java", "PySpark", "TypeScript"],
    ml_dl: ["PyTorch", "Scikit-Learn", "TensorFlow"],
    data: ["SQL Server", "MySQL", "DuckDB", "Polars", "Pandas"],
    cloud: ["Azure", "Microsoft Fabric"],
    tools: ["Git", "Docker", "Power BI"],
}

export const projects = [
    {
        title: "Recommender System using Goodbooks-10k",
        description: "A collaborative filtering recommender system built with Python and Scikit-Learn using the Goodbooks-10k dataset.",
        tags: ["Python", "Machine Learning", "Scikit-Learn"],
        githubLink: "https://github.com",
        slug: "recommender-system",
    },
    {
        title: "Power BI Real-Time Analytics with Fabric",
        description: "Real-time dashboarding solution leveraging Microsoft Fabric for data ingestion and Power BI for visualization.",
        tags: ["Power BI", "Microsoft Fabric", "Real-Time"],
        slug: "powerbi-fabric",
    },
    {
        title: "Cyclone Modeling using ODE/PDE",
        description: "Mathematical modeling of cyclone paths using Ordinary and Partial Differential Equations.",
        tags: ["Math", "Python", "Modeling"],
        slug: "cyclone-modeling",
    },
    {
        title: "SmartDedup",
        description: "Intelligent data deduplication system using machine learning techniques to identify duplicate records.",
        tags: ["Machine Learning", "Data Engineering", "Python"],
        slug: "smart-dedup",
    },
]

export const blogPosts = [
    {
        title: "Getting Started with MLOps",
        description: "An introduction to Machine Learning Operations and why it matters.",
        date: "2023-10-01",
        slug: "getting-started-mlops",
        tags: ["MLOps", "Machine Learning", "DevOps"],
    },
    {
        title: "Microsoft Fabric: A Game Changer?",
        description: "Exploring the new data analytics platform from Microsoft.",
        date: "2023-11-15",
        slug: "microsoft-fabric-review",
        tags: ["Microsoft Fabric", "Data Engineering", "Azure"],
    },
    {
        title: "Advanced MDX Features",
        description: "A demonstration of the advanced MDX features available in this blog system.",
        date: "2023-12-01",
        slug: "advanced-mdx-features",
        tags: ["Next.js", "MDX", "React", "Visualization"],
    }
]
