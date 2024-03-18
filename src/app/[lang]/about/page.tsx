import { useTranslation } from "@/app/i18n";
import Link from "next/link";
import Dynamic from "./dynamic";

export default async function Page({
  params: { lang },
}: {
  params: { lang: string | undefined };
}) {
  const { t } = await useTranslation(lang, "about");
  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lang}`}>back</Link>
      <Dynamic />
    </>
  );
}
