import createMiddleware from "next-intl/middleware";
import {routing} from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const cookie = request.headers.get("cookie");

  const locale = cookie
    ?.split("; ")
    .find((item) => item.startsWith("NEXT_LOCALE="))
    ?.split("=")[1];


  // Si entra a la raíz y ya tiene idioma guardado
  if (
    pathname === "/" &&
    locale &&
    routing.locales.includes(locale as "en" | "es" | "fr")
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    );
  }

  return handleI18nRouting(request);
}


export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};