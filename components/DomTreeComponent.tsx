import Accordian from "./Accordian";

type Props = {
  code: string;
  containerElement: HTMLElement | undefined;
  clickHandler: (path: string) => void;
};

const DomTreeComponent = (props: Props) => {
  const element = document.createElement("div");
  element.innerHTML = props.code;

  const generateDomTree = (element: HTMLElement, path: string): any => {
    const children = element.children;

    let node = (
      <>
        {Array.from(children).map((child, index) => (
          <Accordian
            key={`${child}_${index}`}
            title={child.tagName.toLowerCase()}
            className="pl-1.5"
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

  return <div>{element && generateDomTree(element, "#")}</div>;
};

export default DomTreeComponent;
