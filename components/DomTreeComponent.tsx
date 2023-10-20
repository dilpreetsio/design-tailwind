import { useState } from "react";
import Accordian from "./Accordian";

type Props = {
  containerElement: HTMLElement | undefined;
  clickHandler: (path: string) => void;
};

const DomTreeComponent = (props: Props) => {
  console.log(props.containerElement);
  const generateDomTree = (element: HTMLElement, path: string): any => {
    const children = element.children;

    console.log(children.length);
    let node = (
      <>
        {Array.from(children).map((child, index) => (
          <Accordian
            key={`${child}_${index}`}
            title={child.tagName.toLowerCase()}
            className="pl-1"
            path={`${path}-${index}`}
            clickHandler={props.clickHandler}
          >
            {child.children.length > 0 &&
              generateDomTree(child as HTMLElement, `${path}-${index}`)}
          </Accordian>
        ))}
      </>
    );

    return node;
  };

  return (
    <div>
      {props.containerElement?.innerHTML &&
        generateDomTree(props.containerElement, "#")}
    </div>
  );
};

export default DomTreeComponent;
