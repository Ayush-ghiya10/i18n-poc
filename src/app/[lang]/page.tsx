import { getDictionary } from "./dictionaries";

export default async function Home({ params: { lang } }) {
  console.log("🚀 ~ Home ~ lang:", lang);

  const dict = await getDictionary(lang);
  return (
    <div>
      <h1>{dict["mainPage.heading"]}</h1>
    </div>
  );
}
