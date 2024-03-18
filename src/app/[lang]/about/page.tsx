"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getDictionary } from "../dictionaries";

const Page = () => {
  const [counter, setCounter] = useState(0);
  const params = useParams();
  console.log(params);
  let dict: any;
  getDictionary(params.lang as string).then((val) => {
    console.log("🚀 ~ getDictionary ~ val:", val);

    dict = val;
  });
  return (
    <div>
      <h2>{dict ?? dict["mainPage.heading"]}</h2>
      <button onClick={() => setCounter(counter + 1)}>Click me!</button>
      <p>You clicked the button {counter} times.</p>
    </div>
  );
};

export default Page;
