export const fallbackLng = "en";
export const languages = [fallbackLng, "es", "de"];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
export function getOptions1(ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,

    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
