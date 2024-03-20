"use client";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslationNew } from "../i18n";

const Dynamic = () => {
  const params = useParams();
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation("about");
  console.log(useTranslationNew("about"));
  return (
    <div>
      <h2>{t("dynamicTitle")}</h2>
      <button onClick={() => setCounter(counter + 1)}>Click me!</button>
      <p>{t("counter_other", { count: counter })}</p>
      <p>You clicked the button {counter} times.</p>
    </div>
  );
};

export default Dynamic;
