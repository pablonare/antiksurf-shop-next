import Link from "next/link";
import styles from "./Brand.module.css";

function Brand() {
  return (
    <Link href="/" className={styles.brand}>
      <h1>ANTIK SURF SHOP</h1>
    </Link>
  );
}

export default Brand;