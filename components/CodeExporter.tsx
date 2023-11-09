import ClickOutsideComponent from "./ClickOutsideComponent";
import TabComponent from "./TabComponent";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  toggleModal: () => void;
  code: string;
};

//prettier-ignore
const reactFormat = (code: string) =>
`const Component = () => {
  return (
    ${code}
  )
}

export default Component;
`;
const CodeExporter = ({ toggleModal, code }: Props) => {
  const [currentTab, setCurrentTab] = useState("Html");

  const generateReact = (code: string) => {
    let reactCode = code.replace(/class/g, "className");
    return reactFormat(reactCode);
  };

  const generateCode = (type: string) => {
    setCurrentTab(type);
  };

  const copyCode = () => {
    const codeToCopy = currentTab === "Html" ? code : generateReact(code);

    navigator.clipboard.writeText(codeToCopy).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="absolute w-full h-screen bg-black bg-opacity-80 top-0 z-50 flex flex-col justify-center items-center overflow-none">
      <ClickOutsideComponent
        outsideClickHandler={toggleModal}
        className="bg-white w-2/3 min-h-1/2 p-4 rounded-lg border"
      >
        <div className="flex flex-row">
          <h3 className="text-xl font-medium px-1 text-gray-800">
            Export code
          </h3>
          <button
            type="button"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={copyCode}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>

        <div className="py-2">
          <TabComponent
            currentTab={currentTab}
            tabs={["Html", "React"]}
            handleTabChange={generateCode}
          />
          <div className="pt-4">
            <SyntaxHighlighter
              language={currentTab === "Html" ? "handlebars" : "jsx"}
              style={dracula}
              wrapLongLines={true}
            >
              {currentTab === "Html" ? code : generateReact(code)}
            </SyntaxHighlighter>
          </div>
        </div>
      </ClickOutsideComponent>
    </div>
  );
};

export default CodeExporter;
