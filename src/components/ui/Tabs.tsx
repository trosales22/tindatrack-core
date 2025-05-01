import React, { useState } from 'react';

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultIndex?: number;
  withBorder?: boolean;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0, withBorder = true }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Tab headers with horizontal scroll on mobile */}
      <div className="flex shrink-0 overflow-x-auto border-b border-gray-300 no-scrollbar space-x-4 px-2">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 -mb-px text-sm sm:text-base font-medium cursor-pointer whitespace-nowrap transition-all duration-200 border-b-2 ${
              idx === activeIndex
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Scrollable content area */}
      <div
        className={`flex-1 overflow-auto ${
          withBorder ? 'border border-t-0 border-gray-300' : ''
        } rounded-b-md bg-white p-4`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
