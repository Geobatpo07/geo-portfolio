import { Metadata } from "next";

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Certificates & Credentials | Professional Achievements",
  description:
    "Professional certifications and credentials in Data Science, Machine Learning, Cloud Computing, and Data Engineering.",
  keywords: [
    "Certificates",
    "Credentials",
    "Certifications",
    "Professional",
    "Achievements",
  ],
  openGraph: {
    title: "Certificates | Geo's Portfolio",
    description: "Professional certifications and credentials",
    url: `${baseUrl}/certificates`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "My Certificates",
      },
    ],
  },
  twitter: {
    title: "Certificates | Geo's Portfolio",
    description: "Professional certifications and credentials",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/certificates`,
  },
};

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
