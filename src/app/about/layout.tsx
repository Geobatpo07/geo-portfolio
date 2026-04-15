import { Metadata } from "next";

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  title: "About Me | Data Scientist, Engineer & Researcher",
  description:
    "Learn about my background in Data Science, Machine Learning Engineering, Environmental Modeling, and Advanced Analytics. Discover my experience and expertise.",
  keywords: [
    "About",
    "Bio",
    "Data Scientist",
    "Engineer",
    "Researcher",
    "Experience",
    "Background",
  ],
  openGraph: {
    title: "About Me | Geo's Portfolio",
    description:
      "Data Scientist, Engineer & Researcher specializing in MLOps and Data Systems",
    url: `${baseUrl}/about`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About Geovany",
      },
    ],
  },
  twitter: {
    title: "About Me | Geo's Portfolio",
    description:
      "Data Scientist, Engineer & Researcher specializing in MLOps and Data Systems",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
