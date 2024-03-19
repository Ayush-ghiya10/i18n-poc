import { createTranslation } from "./i18n/server";
import Link from "next/link";

export default async function Home() {
  const { t } = await createTranslation("translation");
  return (
    <div>
      <h1>{t("title")}</h1>

      <Link href={`/${"df"}/about`}>About page</Link>
    </div>
  );
}
