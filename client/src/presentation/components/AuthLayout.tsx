import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center">
      <div className="mt-10">
        <Logo />
      </div>

      <div className="mt-10 w-[550px] bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl text-center font-semibold">
          {title}
        </h1>

        <p className="text-center text-gray-500 mt-3">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>
      </div>

      <p
        className="mt-12 cursor-pointer"
        onClick={() => navigate(ROUTES.PUBLIC.HOME)}
      >
        ← Back to home
      </p>
    </div>
  );
};

export default AuthLayout;