import { Metadata } from "next";

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  title: "Contact | Get in Touch",
  description:
    "Get in touch with me for collaborations, consultations, or inquiries. I'm interested in discussing Data Science, Engineering, and Research opportunities.",
  keywords: ["Contact", "Email", "Collaboration", "Inquiry", "Connect"],
  openGraph: {
    title: "Contact | Geo's Portfolio",
    description: "Contact me for collaborations and inquiries",
    url: `${baseUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact",
      },
    ],
  },
  twitter: {
    title: "Contact | Geo's Portfolio",
    description: "Contact me for collaborations and inquiries",
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
