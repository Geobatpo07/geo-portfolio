import { Metadata } from "next";

const baseUrl = "https://geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Projects | Data Science & Engineering Portfolio",
  description:
    "Showcase of my data science, machine learning, and data engineering projects. Explore innovative solutions for complex problems.",
  keywords: [
    "Projects",
    "Portfolio",
    "Data Science",
    "Machine Learning",
    "Data Engineering",
    "Case Studies",
  ],
  openGraph: {
    title: "Projects | Geo's Portfolio",
    description:
      "Showcase of data science, machine learning, and engineering projects",
    url: `${baseUrl}/projects`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "My Projects",
      },
    ],
  },
  twitter: {
    title: "Projects | Geo's Portfolio",
    description:
      "Showcase of data science, machine learning, and engineering projects",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
};

export default function ProjectsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
