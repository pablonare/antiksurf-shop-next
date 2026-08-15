import { PRODUCTS_BY_TYPE_QUERY } from "@/lib/shopify/queries";
import { shopifyClient } from "@/lib/shopify/client";
import ProductsScrollGrid from "@/components/shop/components/ScrollGrid/ProductsScrollGrid";

export default async function TypeScrollGrid({
  type,
  heading,
  headingHref,
}: {
  type: string;
  heading: string;
  headingHref?: string;
}) {
  const { data } = await shopifyClient.request(PRODUCTS_BY_TYPE_QUERY, {
    variables: {
      query: `product_type:"${type}"`,
    },
  });

  const products = data?.products?.nodes ?? [];

  return (
    <ProductsScrollGrid
      heading={heading}
      headingHref={headingHref}
      products={products}
    />
  );
}