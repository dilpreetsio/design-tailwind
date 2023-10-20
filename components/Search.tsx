import { tailwindCSS } from "../data/classes";
import { useEffect, useState } from "react";
import ClickOutsideComponent from "./ClickOutsideComponent";
const Search = ({ classes, addClass, removeClass }: SearchProps) => {
  const [search, setSearch] = useState<string>("");
  const [filteredClasses, setFilteredClasses] = useState<string[]>([]);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = tailwindCSS.filter((c) =>
        c.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredClasses(filtered);
    }
  }, [search]);

  return (
    <div className=" border p-4 rounded-xl z-10 ">
      <form className="flex items-center relative">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search class"
            required
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filteredClasses.length > 0 && (
          <ClickOutsideComponent
            outsideClickHandler={() => {
              setFilteredClasses([]);
            }}
            className="absolute bg-white top-10 max-h-80 w-full z-50 rounded-lg border overflow-auto"
          >
            {filteredClasses.map((c: string) => (
              <div
                key={c}
                className="py-2 px-2 text-gray-500 hover:text-gray-800 cursor-pointer border-b border-t border-gray-50"
                onClick={() => addClass(c)}
              >
                {c}
              </div>
            ))}
          </ClickOutsideComponent>
        )}
      </form>
      {classes.length > 0 && (
        <div className="py-2">
          {classes.map((c: string) => (
            <span
              key={c}
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 mr-1 my-1 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {c}
              <button
                type="button"
                className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
                onClick={() => removeClass(c)}
              >
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

type SearchProps = {
  classes: string[];
  addClass: (c: string) => void;
  removeClass: (c: string) => void;
};
export default Search;
