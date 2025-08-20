import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(
  async ({ requestLocale }: { requestLocale: Promise<string | undefined> }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale)) {
      locale = routing.defaultLocale;
    }

    // let messages: { default: unknown } = { default: {} };
    // try {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   messages = await import(`../../messages/${locale}.json`);
    // } catch {
    //   /* empty */
    // }
    //
    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  },
);
