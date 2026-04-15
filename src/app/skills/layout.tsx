import { Metadata } from "next";

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Skills & Expertise | Technical Proficiencies",
  description:
    "My technical skills in Data Science, Machine Learning, Big Data, Cloud Computing, and Data Engineering. Technical expertise and proficiencies.",
  keywords: [
    "Skills",
    "Expertise",
    "Technical",
    "Data Science",
    "Machine Learning",
    "Cloud",
    "Python",
  ],
  openGraph: {
    title: "Skills | Geo's Portfolio",
    description: "Technical skills and expertise in data science and engineering",
    url: `${baseUrl}/skills`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "My Skills",
      },
    ],
  },
  twitter: {
    title: "Skills | Geo's Portfolio",
    description: "Technical skills and expertise in data science and engineering",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/skills`,
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
