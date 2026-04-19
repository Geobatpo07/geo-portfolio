import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";
import { Footer } from "@/components/shared/Footer";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://stories.geovanylaguerre.net";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Geovany Batista Polo LAGUERRE | Data Scientist, Engineer & Researcher",
    template: "%s | Geo's Portfolio",
  },
  description:
    "Data Scientist and Engineer specializing in MLOps, Big Data Analytics, Environmental Modeling, and Advanced Data Systems. Explore projects, research, and insights.",
  keywords: [
    "Data Science",
    "Machine Learning",
    "MLOps",
    "Big Data",
    "Data Engineering",
    "Cloud Computing",
    "Environmental Modeling",
    "Data Analytics",
    "Portfolio",
    "Geovany Batista",
  ],
  authors: [{ name: "Geovany Batista Polo LAGUERRE" }],
  creator: "Geovany Batista Polo LAGUERRE",
  publisher: "Geovany Batista Polo LAGUERRE",
  formatDetection: {
    email: true,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Geo's Portfolio",
    title: "Geovany Batista Polo LAGUERRE | Data Scientist & Engineer",
    description:
      "Data Scientist and Engineer specializing in MLOps, Big Data Analytics, and Environmental Modeling",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Geo's Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GeovanyLAG07",
    creator: "@GeovanyLAG07",
    title: "Geovany Batista Polo LAGUERRE | Data Scientist & Engineer",
    description:
      "Data Scientist and Engineer specializing in MLOps, Big Data Analytics, and Environmental Modeling",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "rojwBrKhGPieH4IQI9wDKrUFizkw4_68XqrYRMSzte4",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: `${baseUrl}/en`,
      fr: `${baseUrl}/fr`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sidebar - Left Column (Desktop Only) */}
          <aside className="w-64 shrink-0 hidden lg:flex">
            <Sidebar />
          </aside>

          {/* Main Column - Right Side */}
          <div className="flex flex-col flex-1 min-h-screen">
            <Navbar />
            <main className="flex-1 p-6 md:p-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
