import type { Metadata } from "next";

import { shopifyClient } from "@/lib/shopify/client";
import { PRODUCTS_QUERY, PRODUCTS_BY_TYPE_QUERY } from "@/lib/shopify/queries";

import Hero from "@/components/shop/hero/Hero";
import ShopNavigation from "@/components/shop/shopnavigation/ShopNavigation";
import TypeGrid from "@/components/shop/components/TypeGrid";
import Container from "@/components/ui/Container/Container";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop the Antik Surf Club selection of surf-inspired products, gear and essentials.",
  alternates: {
    canonical: "/shop",
  },
};

export default async function Page() {
  const { data, errors } = await shopifyClient.request(PRODUCTS_QUERY);

  const { data: productsByTypeData, errors: productsByTypeErrors } =
    await shopifyClient.request(PRODUCTS_BY_TYPE_QUERY, {
      variables: {
        query: 'product_type:"snowboard"',
      },
    });

  if (errors) {
    console.error("Shopify error:", errors);
  }

  if (productsByTypeErrors) {
    console.error("Shopify products by type error:", productsByTypeErrors);
  }

  return (
    <>
      <Hero />
      <ShopNavigation />
      <Container>
        <TypeGrid
          type="tienda"
          heading="T-shirts"
        />
      </Container>
    </>
  );
}