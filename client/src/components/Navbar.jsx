import { ChevronLast, ChevronFirst, ChevronDown, ChevronUp } from "lucide-react";
import { useContext, createContext, useState } from "react";

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
            <nav className="h-full flex flex-col dark:bg-white shadow-sm">
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
                        className="p-1.5 rounded-lg text-slate-200 bg-pink-magenta hover:bg-sea-green max-sm:hidden"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>

                    {/* Button visible only on small screens */}
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg text-slate-200 bg-pink-magenta hover:bg-sea-green sm:hidden"
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
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${active
                    ? "bg-gradient-to-tr from-[#CCCDE0] to-[#E6E6EF] text-[#2F304C]"
                    : "dark:hover:text-gray-700 hover:bg-sky-100 dark:text-gray-500 text-gray-600"
                }
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
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
