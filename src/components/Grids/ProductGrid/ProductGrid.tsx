import Link from "next/link";
import Image from "next/image";
import styles from "./ProductGrid.module.css";
import Container from "@/components/ui/Container/Container";

type Product = {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
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
  products: Product[];
};

export default function ProductsScrollGrid({ heading, products }: ProductsScrollGridProps) {
  if (!products.length) return null;

  return (
    <Container>
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}

      <div className={styles.grid}>
        {products.map((product) => {
            const price = product.variants.nodes[0]?.price;
                return (
                    <Link
                    key={product.id}
                    href={`/shop/${product.handle}`}
                    className={styles.card}
                    >
                    {product.featuredImage && (
                        <div className={styles.imageWrapper}>
                        <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
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
    </section>
    </Container>
  );
}