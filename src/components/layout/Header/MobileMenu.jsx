"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "./MobileMenu.module.css";
import MenuIcon from "../../ui/Icon/MenuIcon";
import CloseIcon from "../../ui/Icon/CloseIcon";
import Brand from "../../ui/Brand/Brand";
import { Link } from "@/i18n/navigation";

function MobileMenu() {
  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(true)}
        aria-label={t("openMenu")}
      >
        <MenuIcon />
      </button>

      {isOpen && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <button
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label={t("closeMenu")}
        >
          <CloseIcon />
        </button>

        <div className={styles.menuBrand}>
          <Brand />
        </div>

        <nav className={styles.navigation}>

          <Link href="/">
            Home
          </Link>

          <Link href="/tshirts">
            t-shirts
          </Link>
{/*           
          <Link href="/shop" className={styles.link}>
            hoodies
          </Link>
          
          <Link href="/shop" className={styles.link}>
            boardshorts
          </Link>
          
          <Link href="/shop" className={styles.link}>
            accessories
          </Link> */}

          <a
            href="https://antiksurf.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.antik}
            onClick={() => setIsOpen(false)}
          >
            {t("home")}
          </a>
          
        </nav>
      </aside>
    </div>
  );
}

export default MobileMenu;