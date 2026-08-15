import { PRODUCTS_BY_TYPE_QUERY } from "@/lib/shopify/queries";
import { shopifyClient } from "@/lib/shopify/client";
import ProductsGrid from "@/components/Grids/ProductGrid/ProductGrid";

export default async function CollectionScrollGrid({
  type,
  heading,
}: {
  type: string;
  heading: string;
}) {
  const { data } = await shopifyClient.request(PRODUCTS_BY_TYPE_QUERY, {
    variables: {
      query: `product_type:"${type}"`,
    },
  });

  const products = data?.products?.nodes ?? [];

  return <ProductsGrid heading={heading} products={products} />;
}