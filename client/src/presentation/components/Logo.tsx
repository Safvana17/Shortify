import React from "react";
import { Link } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl 
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      flex items-center justify-center">

        <Link color="white" size={25}/>
      </div>

      <h1 className="text-3xl font-bold text-purple-600">
        Shortify
      </h1>
    </div>
  );
};

export default Logo;