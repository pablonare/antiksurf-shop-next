import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// Para Server Components (usa variables privadas del servidor)
export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2026-07",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
});


