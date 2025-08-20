import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "@/util/constants";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.keys(LOCALES).map((key) => LOCALES[key]),

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,

  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
