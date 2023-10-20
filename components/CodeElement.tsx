import { useRef } from "react";

const CodeElement = ({ code, changeHandler }: CodeElementProps) => {
  const codeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full z-10 max-h-60 overflow-y-auto p-4" ref={codeRef}>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Paste your code here"
        onChange={(e) => changeHandler(e.target.value)}
        value={code}
      ></textarea>
    </div>
  );
};

type CodeElementProps = {
  code: string;
  changeHandler: (code: string) => void;
};

export default CodeElement;
