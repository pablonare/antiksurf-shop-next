"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

import styles from "./LanguageSwitcher.module.css";


const languages = [
  {
    code: "en",
    label: "EN"
  },
  {
    code: "es",
    label: "ES"
  },
  {
    code: "fr",
    label: "FR"
  },
  {
    code: "ar",
    label: "AR"
  }
];


export default function LanguageSwitcher() {

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();


  function changeLanguage(newLocale: string) {

    router.replace(
      pathname,
      {
        locale: newLocale
      }
    );

  }


  return (
    <div className={styles.switcher}>

      {languages.map((lang) => (

        <button
          key={lang.code}
          className={
            locale === lang.code
              ? styles.active
              : ""
          }
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.label}
        </button>

      ))}

    </div>
  );
}