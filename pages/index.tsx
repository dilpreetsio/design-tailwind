import CodeElement from "@/components/CodeElement";
import Search from "@/components/Search";
import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [currentClasses, setCurrentClasses] = useState<string[]>([]);
  const [currentElement, setCurrentElement] = useState<HTMLElement>();
  const [code, setCode] = useState(
    `<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>`
  );

  const elementClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = e.target as HTMLDivElement;

    if (!element.className.includes("wrapper-container-element")) {
      const classes = element.className.split(" ");

      setCurrentElement(element);
      setCurrentClasses(classes);
    }
  };

  const addClass = (c: string) => {
    currentElement?.classList.add(c);
    setCurrentClasses([...currentClasses, c]);
  };

  const removeClass = (c: string) => {
    currentElement?.classList.remove(c);
    setCurrentClasses(currentClasses.filter((cl) => cl !== c));
  };

  return (
    <main className="min-h-screen">
      <Head>
        <script async src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="flex flex-col h-5/6">
        <div className="w-full h-full flex flex-row items-center justify-center flex-1">
          <div className="w-2/3 p-2">
            <div
              className="wrapper-container-element"
              dangerouslySetInnerHTML={{ __html: code }}
              onClick={(e) => elementClickHandler(e)}
            ></div>
          </div>
          <div className="w-1/3 p-2">
            <Search
              classes={currentClasses}
              addClass={addClass}
              removeClass={removeClass}
            />
          </div>
        </div>

        <CodeElement
          code={code}
          changeHandler={(code) => setCode(code || " ")}
        />
      </div>
    </main>
  );
}
