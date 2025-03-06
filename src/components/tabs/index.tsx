import { useState, useEffect } from "react";
import { TabsProps } from "./Tabs.types";

const Tabs = ({
  tabs,
  activeTab: externalActiveTab,
  onTabChange,
  className = "",
}: TabsProps) => {
  // Initialize with external tab if provided, otherwise use first tab or empty string
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    externalActiveTab !== undefined
      ? externalActiveTab
      : tabs.length > 0
      ? tabs[0].id
      : ""
  );

  // Sync with external activeTab if provided
  useEffect(() => {
    if (externalActiveTab !== undefined) {
      setInternalActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]); // Only depend on externalActiveTab changes

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Determine which tab is active - use internal state
  const activeTab =
    externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  // Find the active tab content
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              py-2 
              px-4 
              text-sm 
              font-medium 
              transition-colors 
              duration-200
              focus:outline-none
              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{activeContent}</div>
    </div>
  );
};

export default Tabs;
