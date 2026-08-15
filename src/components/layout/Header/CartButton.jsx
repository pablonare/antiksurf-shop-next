"use client";

import { ShoppingCart } from "lucide-react";
import styles from "./CartButton.module.css";
import { useCart } from "@/lib/shopify/cart-context";

function CartButton() {
  const { totalQuantity, openCart } = useCart();

  return (
    <button
      className={styles.cartButton}
      aria-label="Open cart"
      onClick={openCart}
    >
      <ShoppingCart size={24} />
      {totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </button>
  );
}

export default CartButton;