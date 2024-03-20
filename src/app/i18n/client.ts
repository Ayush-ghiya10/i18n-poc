"use client";

import i18next, { i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  LANGUAGE_COOKIE,
  Locales,
  getOptions,
  supportedLocales,
} from "./settings";
import { useLocale } from "@/hooks/locale-provider";
import { useEffect } from "react";

const runsOnServerSide = typeof window === "undefined";
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["cookie"],
      lookupCookie: LANGUAGE_COOKIE,
      caches: ["cookie"],
    },
    preload: runsOnServerSide ? supportedLocales : [],
  });

export function useTranslation(ns: string) {
  const lng = useLocale();
  const translator = useTransAlias(ns);
  const { i18n } = translator;
  // Run content is being rendered on server side
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomTranslationImplem(i18n, lng);
  }
  return translator;
}
function useCustomTranslationImplem(i18n: i18n, lng: Locales) {
  // This effect changes the language of the application when the lng prop changes.
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}
