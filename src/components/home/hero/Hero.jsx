import Image from "next/image";

import styles from "./Hero.module.css";
import heroImage from "../../../assets/images/shop/IMG_1266.jpg";


function Hero() {
  return (
    <section className={styles.hero}>

      <Image
        src={heroImage}
        alt="Shop"
        priority
        className={styles.background}
      />
      <div className={styles.overlay} />
    </section>
  );
}

export default Hero;