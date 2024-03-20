import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import {
  FALLBACK_LOCALE,
  LANGUAGE_COOKIE,
  supportedLocales,
} from "./app/i18n/settings";
import { cookies } from "next/headers";

function getLocale(request: NextRequest) {
  let languages = new Negotiator({
    headers: { "accept-language": request.headers.get("accept-language")! },
  }).languages();
  return match(languages, supportedLocales, FALLBACK_LOCALE);
}

export default function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get(LANGUAGE_COOKIE);

  const locale = getLocale(req);
  if (!localeCookie || localeCookie.value !== locale) {
    req.cookies.set(LANGUAGE_COOKIE, locale);

    return NextResponse.next({
      headers: { "Set-Cookie": ` ${LANGUAGE_COOKIE}=${locale}; path=/` },
    });
  }
}
