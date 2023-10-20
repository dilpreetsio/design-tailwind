import { MouseEventHandler, ReactNode, useState } from "react";
const Accordian = ({
  children,
  title = "Element name",
  className,
  path,
  clickHandler,
}: AccordianProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const elementClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("toggle-btn")) {
      setIsOpen(!isOpen);
    } else {
      clickHandler(path);
    }
  };

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className={className}
    >
      <div>
        <div
          className="flex cursor-pointer text-sm items-center justify-between w-full py-2 text-left text-gray-500  border-gray-200 focus:ring-none focus:ring-gray-200  "
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
          onClick={elementClickHandler}
        >
          <div className="font-medium">{title.toLowerCase()}</div>
          {children && (
            <div className="toggle-btn p-1" onClick={() => setIsOpen(!isOpen)}>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {children && (
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } py-1 border-t border-gray-50 `}
          aria-labelledby="accordion-collapse-heading-1"
        >
          {children}
        </div>
      )}
    </div>
  );
};

type AccordianProps = {
  title?: string;
  path: string;
  children: ReactNode;
  className?: string;
  clickHandler: (path: string) => void;
};

export default Accordian;
