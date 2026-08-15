import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "es" | "fr" | "ar")) {
    locale = routing.defaultLocale;
  }
  const navigationMessages = (await import(`./messages/navigation/${locale}.json`)).default;
  const shopMessages = (await import(`./messages/shop/${locale}.json`)).default;

  return {
    locale,
    messages: {
      navigation: navigationMessages,
      shop: shopMessages
    }
  };
});
