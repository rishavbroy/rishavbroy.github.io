const siteUrl = "https://rishavbroy.github.io";
const language = "en-US";
const siteDescription =
  "Personal website of Rishav Roy, a University of Wisconsin–Madison student in economics, mathematics, and data science.";
const personDescription =
  "Rishav Roy is a University of Wisconsin–Madison student in economics, mathematics, and data science whose research interests include political economy, development economics, econometrics, machine learning, and institutional design.";

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
export const personImageId = `${siteUrl}/#person-image`;

export type JsonLdNode = Record<string, unknown>;

export function jsonLdGraph(nodes: JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}

export const personJsonLd: JsonLdNode = {
  "@type": "Person",
  "@id": personId,
  url: `${siteUrl}/`,
  name: "Rishav Roy",
  alternateName: ["Rishav B. Roy", "roybrishav", "rishavbroy", "rishavroy"],
  givenName: "Rishav",
  familyName: "Roy",
  description: personDescription,
  disambiguatingDescription:
    "UW–Madison economics, mathematics, and data science student and researcher.",
  jobTitle: "Undergraduate researcher",
  knowsLanguage: language,
  knowsAbout: [
    "Applied econometrics",
    "Artificial intelligence",
    "Causal inference",
    "Development economics",
    "Econometrics",
    "Institutional design",
    "Machine learning",
    "Political economy",
    "Public policy"
  ],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Wisconsin–Madison",
    url: "https://www.wisc.edu/",
    sameAs: [
      "https://www.wikidata.org/wiki/Q838330",
      "https://en.wikipedia.org/wiki/University_of_Wisconsin%E2%80%93Madison"
    ]
  },
  image: {
    "@type": "ImageObject",
    "@id": personImageId,
    url: `${siteUrl}/images/headshot-960.webp`,
    caption: "Rishav Roy",
    width: 960,
    height: 1440
  },
  sameAs: ["https://github.com/rishavbroy", "https://www.linkedin.com/in/roybrishav"]
};

export const websiteJsonLd: JsonLdNode = {
  "@type": "WebSite",
  "@id": websiteId,
  url: `${siteUrl}/`,
  name: "Rishav Roy",
  alternateName: ["Rishav B. Roy", "roybrishav", "rishavbroy", "rishavroy"],
  description: siteDescription,
  inLanguage: language,
  publisher: {
    "@id": personId
  },
  image: {
    "@id": personImageId
  }
};

export function profilePageJsonLd({
  path = "/",
  name = "Rishav Roy",
  description = siteDescription
}: {
  path?: string;
  name?: string;
  description?: string;
} = {}): JsonLdNode {
  const url = new URL(path, siteUrl).href;

  return {
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    isPartOf: {
      "@id": websiteId
    },
    name,
    description,
    inLanguage: language,
    mainEntity: {
      "@id": personId
    }
  };
}

export function collectionPageJsonLd({
  path,
  name,
  description
}: {
  path: string;
  name: string;
  description: string;
}): JsonLdNode {
  const url = new URL(path, siteUrl).href;

  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    isPartOf: {
      "@id": websiteId
    },
    name,
    description,
    inLanguage: language,
    about: {
      "@id": personId
    }
  };
}

export function homepageStructuredData() {
  return jsonLdGraph([websiteJsonLd, personJsonLd, profilePageJsonLd()]);
}

export function collectionPageStructuredData(page: {
  path: string;
  name: string;
  description: string;
}) {
  return jsonLdGraph([websiteJsonLd, personJsonLd, collectionPageJsonLd(page)]);
}
