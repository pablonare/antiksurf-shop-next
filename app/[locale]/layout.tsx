import "@/styles/reset.css";
import "@/styles/variables.css";
import "@/styles/typography.css";
import "@/styles/patterns.css";
import "@/styles/globals.css";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";

import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

import type { Metadata } from "next";

import { cookies } from "next/headers";
import LanguageModal from "@/components/layout/LanguageModal/LanguageModal";
import { CartProvider } from "@/lib/shopify/cart-context";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {

  metadataBase: new URL("https://antiksurf.com"),

    title: {
    default: "Antik Surf Club",
    template: "%s | Antik Surf Club",
    },

    description:
    "Surf lessons, surf trips and unforgettable experiences in Asilah, Morocco.",

    icons: {
      icon: [
            {
      url: "/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
            },
            {
      url: "/favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
            },
          ],
      apple: "/apple-touch-icon.png",
    },

    openGraph: {
    type: "website",
    siteName: "Antik Surf Club",
    locale: "en_US",
    title: "Antik Surf Club | Surf Club in Asilah, Morocco",
    description:
    "Surf lessons, surf trips and unforgettable experiences in Asilah, Morocco.",
    url: "https://antiksurf.com/",
    images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Antik Surf Club",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Antik Surf Club | Asilah, Morocco",
      description:
      "Surf lessons, surf trips and unforgettable experiences in Asilah, Morocco.",
      images: ["/og-image.jpg"],
    },
};


import localFont from "next/font/local";

const antikFont = localFont({
src: "../../src/assets/fonts/AntikFont.woff2",
display: "swap",
weight: "400",
style: "normal",
});

const arabicFont = localFont({
src: "../../src/assets/fonts/IBMPlexSansArabic-Regular.woff2",
variable: "--font-arabic",
display: "swap",
});


export default async function RootLayout({
children,
params,
}: Readonly<{
children: React.ReactNode;
params: Promise<{ locale: string }>;
}>) {

const { locale } = await params;
const messages = await getMessages();

const cookieStore = await cookies();
const hasLocale = !!cookieStore.get("NEXT_LOCALE");

return (
  <html lang={locale}>
    <body>
      <NextIntlClientProvider messages={messages}>
        <CartProvider>

          {!hasLocale && <LanguageModal key={locale} />}

          <Header />

          <main>
            {children}
          </main>

          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </NextIntlClientProvider>
    </body>
  </html>
  );
}