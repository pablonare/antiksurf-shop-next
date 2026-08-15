"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/shopify/cart-context";
import styles from "./ProductDetail.module.css";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
};

type Product = {
  id: string;
  title: string;
  description: string;
  images: { nodes: { url: string; altText: string | null }[] };
  variants: { nodes: Variant[] };
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart, isLoading } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants.nodes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = product.images.nodes;
  const hasMultipleVariants = product.variants.nodes.length > 1;

  async function handleAddToCart() {
    await addToCart(selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {images.map((img, i) => (
          <div key={i} className={styles.imageWrapper}>
            <Image
              src={img.url}
              alt={img.altText || product.title}
              fill
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>
          {new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: selectedVariant.price.currencyCode,
          }).format(Number(selectedVariant.price.amount))}
        </p>

        <p className={styles.description}>{product.description}</p>

        {hasMultipleVariants && (
          <div className={styles.variants}>
            <label htmlFor="variant-select">Opción</label>
            <select
              id="variant-select"
              value={selectedVariant.id}
              onChange={(e) => {
                const variant = product.variants.nodes.find(
                  (v) => v.id === e.target.value
                );
                if (variant) setSelectedVariant(variant);
              }}
            >
              {product.variants.nodes.map((variant) => (
                <option
                  key={variant.id}
                  value={variant.id}
                  disabled={!variant.availableForSale}
                >
                  {variant.title}
                  {!variant.availableForSale ? " (agotado)" : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.quantity}>
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <button
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={!selectedVariant.availableForSale || isLoading}
        >
          {!selectedVariant.availableForSale
            ? "Agotado"
            : isLoading
            ? "Añadiendo..."
            : added
            ? "Añadido ✓"
            : "Añadir al carrito"}
        </button>
      </div>
    </div>
  );
}