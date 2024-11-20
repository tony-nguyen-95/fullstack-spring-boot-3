import React from "react";
import { tabs } from "./tabs.data";
import { NavLink, useLocation } from "react-router-dom";

type Props = {};

export const Sidebar: React.FC<Props> = (props) => {
  const location = useLocation(); // Get the current location

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {tabs.map((tab) => (
            <li key={tab.name}>
              <NavLink
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer ${
                  location.pathname === tab.route
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900"
                    : "text-gray-500"
                }`}
                to={tab.route}
              >
                {tab.icon}
                <span className="flex-1 text-left ms-3 whitespace-nowrap">
                  {tab.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
