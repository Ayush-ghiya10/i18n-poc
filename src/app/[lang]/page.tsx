import Link from "next/link";
import { useTranslation } from "../i18n";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string | undefined };
}) {
  const { t } = await useTranslation(lang as string);
  return (
    <div>
      <h1>{t("title")}</h1>

      <Link href={`/${lang}/about`}>About page</Link>
    </div>
  );
}
