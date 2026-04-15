import { Metadata } from "next";

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Case Studies | Real-World Solutions",
  description:
    "In-depth case studies showcasing data-driven solutions to complex real-world problems in climate modeling, analytics, and data engineering.",
  keywords: [
    "Case Studies",
    "Climate",
    "Data Analysis",
    "Solutions",
    "Projects",
  ],
  openGraph: {
    title: "Case Studies | Geo's Portfolio",
    description:
      "In-depth case studies showcasing data-driven solutions to complex problems",
    url: `${baseUrl}/case-studies`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Case Studies",
      },
    ],
  },
  twitter: {
    title: "Case Studies | Geo's Portfolio",
    description:
      "In-depth case studies showcasing data-driven solutions to complex problems",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
