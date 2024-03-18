import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

let locales = ["en", "es"];

function getLocale(request: NextRequest) {
  let languages = new Negotiator({
    headers: { "accept-language": request.headers.get("accept-language")! },
  }).languages();
  let defaultLocale = "en";
  return match(languages, locales, defaultLocale);
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  getLocale(req);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  console.log("defaulth locale", req.headers.get("accept-language"));
  console.log("pathname", pathname);
  console.log("locale", pathnameHasLocale);
  if (pathnameHasLocale) return;
  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
