import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { NextRequest, NextResponse } from "next/server";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  console.log(req.headers.get("Accept-language"));
  let lang;
  // if (req.cookies.has(cookieName))
  //   lang = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-language"));
  if (!lang) lang = fallbackLng;

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
    );
  }
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }
  return NextResponse.next();
}

// import { NextRequest, NextResponse } from "next/server";
// import Negotiator from "negotiator";
// import { match } from "@formatjs/intl-localematcher";

// let locales = ["en", "es"];

// function getLocale(request: NextRequest) {
//   let languages = new Negotiator({
//     headers: { "accept-language": request.headers.get("accept-language")! },
//   }).languages();
//   let defaultLocale = "en";
//   return match(languages, locales, defaultLocale);
// }

// export default function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   getLocale(req);
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );
//   console.log("defaulth locale", req.headers.get("accept-language"));
//   console.log("pathname", pathname);
//   console.log("locale", pathnameHasLocale);
//   if (pathnameHasLocale) return;
//   const locale = getLocale(req);
//   req.nextUrl.pathname = `/${locale}${pathname}`;
//   return NextResponse.redirect(req.nextUrl);
// }
