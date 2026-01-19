import type { Metadata } from "next";

type CrushlyMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function getCrushlyMetadata({
  title,
  description,
  path = "",
}: CrushlyMetadataProps = {}): Metadata {
  const baseTitle = "Crushly";
  const baseDescription =
    "Crushly is a modern dating platform designed to help you connect, match, and build meaningful relationships.";

  return {
    title: title ? `${title} | ${baseTitle}` : baseTitle,
    description: description ?? baseDescription,

    metadataBase: new URL("https://crushly.app"),

    alternates: {
      canonical: `/${path}`,
    },

    openGraph: {
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description ?? baseDescription,
      url: `https://crushly.app/${path}`,
      siteName: "Crushly",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Crushly – Find Your Match",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description ?? baseDescription,
      images: ["/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
    },

    keywords: [
      "dating app",
      "relationships",
      "love",
      "online dating",
      "matchmaking",
      "Crushly",
    ],

    authors: [{ name: "Crushly Team" }],
    creator: "Crushly",
    applicationName: "Crushly",
  };
}
