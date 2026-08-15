import Link from "next/link";
import Image from "next/image";
import styles from "./ProductsScrollGrid.module.css";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/layout/Section/Section";

type Product = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  variants: {
    nodes: {
      price: {
        amount: string;
        currencyCode: string;
      };
    }[];
  };
};

type ProductsScrollGridProps = {
  heading?: string;
  headingHref?: string;
  products: Product[];
};

export default function ProductsScrollGrid({
  heading,
  headingHref,
  products,
}: ProductsScrollGridProps) {
  if (!products.length) return null;

  return (
    <Container>
      <Section>
        {heading && (
          <h2 className={styles.heading}>
            {headingHref ? (
              <Link href={headingHref} className={styles.headingLink}>
                {heading}
              </Link>
            ) : (
              heading
            )}
          </h2>
        )}

        <div className={styles.scroller}>
          {products.map((product) => {
            const price = product.variants.nodes[0]?.price;

            const href =
              product.productType === "surftrip"
                ? `/surftrips/${product.handle}`
                : `/shop/${product.handle}`;

            return (
              <Link
                key={product.id}
                href={href}
                className={styles.card}
              >
                {product.featuredImage && (
                  <div className={styles.imageWrapper}>
                    <Image
                      src={product.featuredImage.url}
                      alt={
                        product.featuredImage.altText || product.title
                      }
                      fill
                      sizes="(max-width: 768px) 85vw, 25vw"
                      className={styles.image}
                    />
                  </div>
                )}

                <h3 className={styles.title}>{product.title}</h3>

                {price && (
                  <p className={styles.price}>
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: price.currencyCode,
                    }).format(Number(price.amount))}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}