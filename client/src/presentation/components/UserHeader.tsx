import React from "react";
import Logo from "./Logo";

interface HeaderProps {
    userName: string;
    onLogout: () => void;
}

const UserHeader: React.FC<HeaderProps> = ({ userName, onLogout }) => {
    return (
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
            <Logo />
            <div className="flex items-center gap-5">
                <p className="text-gray-700 font-medium">
                    Hi, {userName}
                </p>
                <button
                    onClick={onLogout}
                    className=" px-5 py-2 rounded-lg bg-[#B20709] text-white hover:bg-red-600">
                    Logout
                </button>
            </div>
        </header>
    )
}


export default UserHeader;