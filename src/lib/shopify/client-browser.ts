import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// Para Client Components (usa variables NEXT_PUBLIC_, expuestas al navegador)
export const shopifyClientBrowser = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2026-07",
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});