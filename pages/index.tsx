import CodeElement from "@/components/CodeElement";
import DomTreeComponent from "@/components/DomTreeComponent";
import Search from "@/components/Search";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [currentClasses, setCurrentClasses] = useState<string[]>([]);
  const [currentElement, setCurrentElement] = useState<HTMLElement>();
  const [root, setRoot] = useState<HTMLElement>();
  const [code, setCode] = useState(``);
  const defaultCode = `<button type="button" class="text-white bg-blue-700
  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
  text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
  focus:outline-none dark:focus:ring-blue-800">Design tailwind</button>`;
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      setCode(defaultCode);
    }
  }, []);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = code;
      setRoot(codeRef.current);
    }
  }, [code]);

  const elementClickHandler = (path: string) => {
    let element = codeRef.current as HTMLElement;
    const pathElements = path.split("-");
    pathElements.shift();

    if (element) {
      pathElements.forEach((index) => {
        const children = element.children;
        element = children[parseInt(index)] as HTMLElement;
      });
    }

    setCurrentElement(element);
    setCurrentClasses(Array.from(element?.classList || []));
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
    <main className="sm:h-screen">
      <Head>
        <script async src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="flex flex-col h-full">
        <div className="w-full h-4/6 flex flex-row flex-1">
          <div className="w-1/3 p-2 py-5 px-3">
            <div className="p-2 border rounded-xl h-fit overflow-y-auto">
              {code && (
                <DomTreeComponent
                  code={code}
                  containerElement={root}
                  clickHandler={elementClickHandler}
                />
              )}
            </div>
          </div>
          <div className="w-1/3 p-2 flex flex-col items-center justify-center">
            <div className="wrapper-container-element" ref={codeRef}></div>
          </div>
          <div className="w-1/3 py-5 px-3">
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
