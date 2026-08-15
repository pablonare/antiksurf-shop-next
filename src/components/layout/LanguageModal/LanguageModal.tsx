"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import styles from "./LanguageModal.module.css";

export default function LanguageModal() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(true);

  function changeLanguage(locale: "en" | "es" | "fr" | "ar") {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    setIsOpen(false);

    window.location.href = `/${locale}${pathname}`;
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <h2 className={styles.title}>
          Choose your language
        </h2>

        <p className={styles.description}>
          We’ll remember your choice for your next visit.
        </p>

        <div className={styles.buttons}>

          <button
            className={styles.button}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>

          <button
            className={styles.button}
            onClick={() => changeLanguage("es")}
          >
            Español
          </button>

          <button
            className={styles.button}
            onClick={() => changeLanguage("fr")}
          >
            Français
          </button>

          <button
            className={styles.button}
            onClick={() => changeLanguage("ar")}
          >
            العربية
          </button>

        </div>

      </div>
    </div>
  );
}