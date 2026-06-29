import React from "react";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface HeaderProps {
    userName: string;
}

const UserHeader: React.FC<HeaderProps> = ({ userName}) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await dispatch(logout()).unwrap()

            toast.success('User logged out successfully')
            navigate(ROUTES.PUBLIC.HOME, { replace: true})
        } catch (error) {
            toast.error(typeof error === 'string' ? error : 'Failed user logout')
        }
    }
    return (
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
            <Logo />
            <div className="flex items-center gap-5">
                <p className="text-gray-700 font-medium">
                    Hi, {userName}
                </p>
                <button
                    onClick={handleLogout}
                    className=" px-5 py-2 rounded-lg bg-[#B20709] text-white hover:bg-red-600">
                    Logout
                </button>
            </div>
        </header>
    )
}


export default UserHeader;