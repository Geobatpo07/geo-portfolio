const baseUrl = "https://geovanylaguerre.net";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Geovany Batista Polo LAGUERRE",
    givenName: "Geovany",
    familyName: "LAGUERRE",
    url: baseUrl,
    image: `${baseUrl}/profile.png`,
    description:
      "Data Scientist and Engineer specializing in MLOps, Big Data Analytics, Environmental Modeling, and Advanced Data Systems.",
    jobTitle: ["Data Scientist", "Data Engineer", "Software Engineer", "Researcher"],
    worksFor: {
      "@type": "Organization",
      name: "Independent Consultant",
    },
    graduationDate: new Date().toISOString(),
    knowsLanguage: ["en", "fr"],
    alumniOf: {
      "@type": "Organization",
      name: "Independent Researcher",
    },
    sameAs: [
      "https://github.com/Geobatpo07",
      "https://www.linkedin.com/in/geobatpo07/",
      "https://twitter.com/GeovanyLAG07",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Geo's Portfolio",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    creator: {
      "@type": "Person",
      name: "Geovany Batista Pololaguerre",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    image: article.image || `${baseUrl}/og-image.png`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author || "Geovany Batista Polo LAGUERRE",
      url: baseUrl,
    },
    creator: {
      "@type": "Person",
      name: article.author || "Geovany Batista Polo LAGUERRE",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  image?: string;
  url: string;
  dateCreated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    image: project.image || `${baseUrl}/og-image.png`,
    url: project.url,
    dateCreated: project.dateCreated,
    author: {
      "@type": "Person",
      name: "Geovany Batista Polo LAGUERRE",
      url: baseUrl,
    },
    creator: {
      "@type": "Person",
      name: "Geovany Batista Polo LAGUERRE",
    },
  };
}
