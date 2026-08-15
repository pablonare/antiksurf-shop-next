import { shopifyClient } from "@/lib/shopify/client";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/queries";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/shop/components/ProductDetail/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { data } = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
    variables: { handle },
  });

  if (!data?.product) notFound();

  return <ProductDetail product={data.product} />;
}