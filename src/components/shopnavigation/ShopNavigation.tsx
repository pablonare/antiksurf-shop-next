import Link from "next/link";
import styles from "./ShopNavigation.module.css";

export default function ShopNavigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.scroller}>

        <Link href="/shop/tshirts">
          t-shirts
        </Link>

        <Link href="/shop" className={styles.link}>
          hoodies
        </Link>

        <Link href="/shop" className={styles.link}>
          boardshorts
        </Link>

        <Link href="/shop" className={styles.link}>
          accessories
        </Link>
      </div>
    </nav>
  );
}