import { Metadata } from "next";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import BlogPageClient from "@/components/blog/BlogPageClient";

const baseUrl = "https://geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Blog | Data Science & Engineering Insights",
  description:
    "Explore technical articles on Data Science, MLOps, Big Data, Environmental Modeling, and Data Engineering. Learn from practical implementations and research insights.",
  keywords: [
    "Blog",
    "Data Science",
    "Machine Learning",
    "MLOps",
    "Big Data",
    "Data Engineering",
    "Tutorials",
  ],
  openGraph: {
    title: "Blog | Geo's Portfolio",
    description:
      "Technical articles on Data Science, MLOps, Big Data, and Data Engineering",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Geo's Blog",
      },
    ],
  },
  twitter: {
    title: "Blog | Geo's Portfolio",
    description:
      "Technical articles on Data Science, MLOps, Big Data, and Data Engineering",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllFilesFrontMatter("blog");

  const normalizedPosts = posts
    .map((post) => ({
      slug: post.slug,
      frontMatter: {
        title: String(post.title ?? ""),
        date: String(post.date ?? ""),
        description: String(post.description ?? ""),
        tags: Array.isArray(post.tags) ? post.tags : ["Data Science", "Engineering"],
      },
      content: "",
    }))
    .sort((a, b) => {
      const dateA = new Date(String(a.frontMatter.date)).getTime();
      const dateB = new Date(String(b.frontMatter.date)).getTime();
      return dateB - dateA;
    });

  return <BlogPageClient posts={normalizedPosts} />;
}
