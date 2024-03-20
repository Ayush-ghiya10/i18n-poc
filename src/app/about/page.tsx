import Link from "next/link";
import Dynamic from "./dynamic";
import { createTranslation } from "../i18n/server";

export default async function Page({
  params: { lang },
}: {
  params: { lang: string | undefined };
}) {
  const { t } = await createTranslation("about");
  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lang}`}>back</Link>
      <Dynamic />
    </>
  );
}
