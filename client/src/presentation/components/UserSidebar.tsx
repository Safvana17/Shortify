import React from "react";


interface SidebarProps {
    activePage: string;
    setActivePage: (page:string)=>void;
}


const UserSidebar:React.FC<SidebarProps> = ({
    activePage,
    setActivePage
}) => {


return (
    <aside className="w-64 min-h-[calc(100vh-80px)] bg-white shadow-md p-5">
        <nav className="space-y-3">
            <button
                onClick={()=>setActivePage("create")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${activePage === "create" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100" }`}>
                + Create Link
            </button>
            <button
                onClick={()=>setActivePage("links")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${activePage === "links" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                Your Links
            </button>
        </nav>
    </aside>
)}


export default UserSidebar;