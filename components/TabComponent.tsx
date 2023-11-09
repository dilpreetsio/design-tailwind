type Props = {
  tabs: string[];
  handleTabChange: (type: string) => void;
  currentTab: string;
};

const TabComponent = ({ tabs, handleTabChange, currentTab }: Props) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <li
            className="mr-2 cursor-pointer"
            key={tab}
            onClick={() => handleTabChange(tab)}
          >
            <div
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
                currentTab.toLowerCase() === tab.toLowerCase()
                  ? "border-blue-500 text-gray-800 "
                  : ""
              }}`}
            >
              {tab}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabComponent;
