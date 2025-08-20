import { Metadata } from "next";

import { LOCALES_FLAT, DEFAULT_LOCALE } from "./constants";
import { WEBSITE_URL } from "./constants";

export function generateBaseMetadata(
  data: {
    meta_title?: string; // | KeyTextField
    meta_description?: string; // | KeyTextField;
    meta_image?: { url: string }; // ImageField;
  },
  path: string,
  pathVariations?:
    | {
        uid: string | null;
        slugs: string[];
        lang: string;
        url: string | null;
      }[]
    | null,
): Metadata {
  const locales = LOCALES_FLAT;

  const parsedPath = path === "/" ? "" : path;
  // Convert locales to an object of locale => website url + locale + path
  const localeUrls: Record<string, string> = {
    "x-default": `${WEBSITE_URL}${parsedPath}`,
  };

  // TODO: This is very broken and doesn't work for pages
  for (const locale of locales) {
    const parsedLocalePath = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
    localeUrls[locale] = pathVariations
      ? `${WEBSITE_URL}${
          pathVariations.find((pathVariation) => pathVariation.lang === locale)
            ?.url ?? `${parsedLocalePath}${parsedPath}`
        }`
      : `${WEBSITE_URL}${parsedLocalePath}${parsedPath}`;
  }

  return {
    title: data.meta_title,
    description: data.meta_description,
    alternates: {
      canonical: `${WEBSITE_URL}${pathVariations?.at(0)?.url ?? parsedPath}`,
      languages: localeUrls,
    },
    openGraph: {
      title: data.meta_title ?? undefined,
      images: [
        {
          // TODO: Add default fallback image based on language
          url: data.meta_image?.url ?? "",
        },
      ],
    },
    icons: {
      icon: [
        "/favicon.ico",
        {
          url: "/icon0.svg",
          sizes: "any",
          rel: "icon",
          type: "image/svg+xml",
        },
        {
          url: "/icon1.png",
          sizes: "96x96",
          rel: "icon",
          type: "image/png",
        },
      ],
      apple: ["/apple-icon.png"],
      shortcut: ["/apple-icon.png"],
    },
    manifest: "/manifest.json",
  };
}
