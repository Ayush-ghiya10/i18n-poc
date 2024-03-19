import { createInstance } from "i18next";
import {
  FALLBACK_LOCALE,
  LANGUAGE_COOKIE,
  Locales,
  getOptions,
  supportedLocales,
} from "./settings";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { cookies, headers } from "next/headers";
import Negotiator from 'negotiator'
import { match } from "@formatjs/intl-localematcher";

async function initI18next(lang: Locales, namespace: string) {
  console.log("🚀 ~ initI18next ~ lang:", lang);
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)
      )
    )
    .init(getOptions(lang, namespace));
  return i18nInstance;
}

export async function createTranslation(ns: string) {
  const lang = getLocale();
  const i18nextInstance = await initI18next(lang, ns);

  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
  };
}
export function getLocale() {
  console.log("🚀 ~ getLocale ~ headers:", headers().get("Accept-language"));
  const cookie = cookies().get(LANGUAGE_COOKIE);
  let languages = new Negotiator({  headers:headers().get("Accept-language") }).languages()
  if (!cookie) {
    const locale = match(
     ,
      supportedLocales,
      FALLBACK_LOCALE
    );
  }

  return (cookies().get(LANGUAGE_COOKIE)?.value ?? FALLBACK_LOCALE) as Locales;
}
