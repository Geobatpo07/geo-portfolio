import { Metadata } from "next";

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Visualizations | Data Insights",
  description:
    "Interactive data visualizations and visual analytics exploring complex datasets and trends in data science.",
  keywords: [
    "Visualizations",
    "Data Viz",
    "Analytics",
    "Interactive",
    "Charts",
    "Graphs",
  ],
  openGraph: {
    title: "Visualizations | Geo's Portfolio",
    description: "Interactive data visualizations and visual analytics",
    url: `${baseUrl}/visualizations`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Visualizations",
      },
    ],
  },
  twitter: {
    title: "Visualizations | Geo's Portfolio",
    description: "Interactive data visualizations and visual analytics",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/visualizations`,
  },
};

export default function VisualizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
