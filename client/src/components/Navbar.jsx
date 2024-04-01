import { ChevronLast, ChevronFirst, ChevronDown, ChevronUp } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * Context for managing the state of the sidebar expansion.
 */
const SidebarContext = createContext();

/**
 * Sidebar component for navigation.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements to render within the sidebar.
 * @returns {JSX.Element} Sidebar component.
 */
export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <aside className="sm:h-screen max-sm:w-[100vw] sticky top-0 z-50">
            <nav className="h-full flex flex-col dark:bg-dark-gray bg-white shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="/lib.png"
                        className={`overflow-hidden aspect-auto max-sm:w-32 ${expanded ? "w-32" : "w-0"
                            }`}
                        alt=""
                    />

                    {/* Button visible only on large screens */}
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg text-slate-200 bg-pink-magenta hover:bg-pink-magenta/75 max-sm:hidden"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>

                    {/* Button visible only on small screens */}
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg text-slate-200 bg-pink-magenta hover:bg-pink-magenta/75 sm:hidden"
                    >
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>

                {/* Provide sidebar expansion state to children */}
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className={`flex-1 px-3 transition-all ${expanded ? "" : "max-sm:hidden"}`}>{children}</ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

/**
 * SidebarItem component for individual sidebar items.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.icon - Icon to display for the sidebar item.
 * @param {string} props.text - Text content of the sidebar item.
 * @param {boolean} [props.active=false] - Indicates whether the sidebar item is active.
 * @param {boolean} [props.alert=false] - Indicates whether the sidebar item has an alert.
 * @returns {JSX.Element} SidebarItem component.
 */
export function SidebarItem({ icon, text, active = false, alert = false }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li
            className={`
                relative flex items-center py-2 ${expanded ? "px-3" : "px-1"}  my-1
                font-medium rounded-md cursor-pointer
                transition-colors group justify-center
                ${active
                    ? "bg-gradient-to-tr from-[#CCCDE0] to-[#E6E6EF] text-[#131111]"
                    : "hover:text-gray-700 hover:bg-sky-100 text-gray-500"
                }
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all !duration-0  ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-sky-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-sky-100 text-[#2F304C] text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}
                >
                    {text}
                </div>
            )}
        </li>
    );
}

export function toggleDarkMode() {
    const html = document.documentElement;

    if (localStorage.getItem("isDark") === null) {
        localStorage.setItem('isDark', 'true');
        html.classList.add('dark');
    } else if (localStorage.getItem("isDark") === 'true') {
        html.classList.remove('dark');
        localStorage.setItem('isDark', 'false');
    } else {
        html.classList.add('dark');
        localStorage.setItem('isDark', 'true');
    }
}


export function ThemeSidebarItem({ active = false, alert = false }) {
    const { expanded } = useContext(SidebarContext);

    const [checkboxVal, setcheckboxVal] = useState(localStorage.getItem("isDark") === 'true');

    return (
        <li
            onClick={() => {
                toggleDarkMode()
                setcheckboxVal(!checkboxVal)
            }}
            className={`
                relative flex items-center py-2 ${expanded ? "px-3" : "px-1"}
                font-medium rounded-md cursor-pointer
                transition-colors group justify-center
                ${active
                    ? "bg-gradient-to-tr from-[#CCCDE0] to-[#E6E6EF] text-[#131111]"
                    : "hover:text-gray-700 hover:bg-sky-100/50 text-gray-500"
                }
            `}
        >
            <ThemeToggle isChecked={checkboxVal} />
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                Theme
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-sky-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    onClick={() => {
                        toggleDarkMode()
                        setcheckboxVal(!checkboxVal)
                    }}
                    className={`
                    absolute left-full rounded-md py-2 px-2 ml-6
                    bg-sky-100 text-[#2F304C] text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}
                >
                    Theme
                </div>
            )}
        </li>
    );
}