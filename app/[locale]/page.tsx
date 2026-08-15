import type { Metadata } from "next";

import Hero from "@/components/shop/hero/Hero";
import TypeScrollGrid from "@/components/shop/components/TypeScrollGrid";

import Container from "@/components/ui/Container/Container";

export const metadata: Metadata = {
  title: "Antik Surf Shop",
  description:
    "Antik Surf Shop selection of surf-inspired products, gear and essentials.",
  alternates: {
    canonical: "/shop",
  },
};

export default async function Page() {
  return (
    <>
      <Hero />
      {/* <ShopNavigation/> */}
      <Container>
        <TypeScrollGrid type="tienda" heading="LAST COLLECTION" />
      </Container>
    </>
  );
}