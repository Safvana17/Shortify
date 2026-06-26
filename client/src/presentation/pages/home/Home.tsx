import React from "react";
import { ArrowRight, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">

      <nav className="h-20 border-b flex items-center justify-between px-8 md:px-20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
            <Link className="text-white" size={22}/>
          </div>
          <h1 className="text-2xl font-bold text-purple-600">
            Shortify
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <button 
            className="text-lg cursor-pointer"
            onClick={() => navigate(ROUTES.PUBLIC.LOGIN)}
          >
            Login
          </button>
          <button 
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
            onClick={() => navigate(ROUTES.PUBLIC.SIGNUP)}
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="px-8 md:px-44 pt-28">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-slate-900">
            Shorten links.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              Share faster.
            </span>
            {" "}Track
            <br />
            smarter.
          </h1>
          <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
            Create short, memorable URLs and manage all your links
            from one simple dashboard.
          </p>
          <div className="flex gap-5 mt-10">
            <button 
              className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-7 py-4 rounded-xl text-lg font-semibold"
              onClick={() => navigate(ROUTES.PUBLIC.SIGNUP)}
            >
              Get Started
              <ArrowRight size={20}/>
            </button>
            <button 
              className="cursor-pointer border border-gray-300 px-8 py-4 rounded-xl text-lg font-medium"
              onClick={() => navigate(ROUTES.PUBLIC.LOGIN)}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Home;