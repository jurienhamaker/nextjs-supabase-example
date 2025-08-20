/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */
// should be the locale IDs registered in your Prismic repository, and values
// should be the string that appears in the URL.
export const LOCALES: { [key: string]: string } = {
  "nl-nl": "nl",
};

export const LOCALES_FLAT = Object.values(LOCALES).map((key) => LOCALES[key]);

export const DEFAULT_LOCALE = "en";

export const WEBSITE_URL = "https://bobb.app";
