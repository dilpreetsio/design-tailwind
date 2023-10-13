import SyntaxHighlighter from "react-syntax-highlighter";
import { useEffect, useRef } from "react";
// import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeElement = ({ code, changeHandler }: CodeElementProps) => {
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    codeRef.current?.setAttribute("contentEditable", "true");
    codeRef.current?.addEventListener("input", (e) => {
      const target = e.target as HTMLDivElement;
      changeHandler(target.innerText);
    });
  }, []);

  return (
    <div className="w-full z-10 max-h-60 overflow-y-auto p-4" ref={codeRef}>
      <SyntaxHighlighter
        // style={darcula}
        language="htmlbars"
        wrapLines={true}
        wrapLongLines={true}
        className="h-full overflow-hidden rounded-lg"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

type CodeElementProps = {
  code: string;
  changeHandler: (code: string) => void;
};
export default CodeElement;
