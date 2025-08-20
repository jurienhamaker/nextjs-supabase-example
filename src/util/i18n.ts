import { LOCALES } from "./constants";

/**
 * Returns the full locale of a given locale. It returns `undefined` if the
 * locale is not in the master list.
 */
export function reverseLocaleLookup(locale: string) {
  for (const key in LOCALES) {
    if (LOCALES[key] === locale) {
      return key;
    }
  }
}
