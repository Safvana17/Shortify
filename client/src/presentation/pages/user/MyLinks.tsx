import React from "react";
import toast from "react-hot-toast";


const MyLinks: React.FC = () => {
    const links = [
        {
        short:"https://short.ly/a12bc",
        original:"https://google.com/very-long-url",
        date:"26 June 2026"
        },
        {
        short:"https://short.ly/x89yz",
        original:"https://youtube.com/watch",
        date:"25 June 2026"
        }
    ]

    const copy = (url:string)=>{
        navigator.clipboard.writeText(url);
        toast.success("Copied");
    }

return (
    <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-6">
            Your Links
        </h1>
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b text-left">
                    <th className="p-3">
                        Short URL
                    </th>
                    <th className="p-3">
                        Original URL
                    </th>
                    <th className="p-3">
                        Created On
                    </th>
                    <th className="p-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                { links.map((link,index)=>(
                    <tr 
                        key={index}
                        className="border-b"
                    >
                        <td className="p-3">
                            <a
                                href={link.short}
                                target="_blank"
                                className="text-indigo-600 underline"
                            >
                                {link.short}
                            </a>
                        </td>
                        <td className="p-3 max-w-xs truncate">
                            {link.original}
                        </td>
                        <td className="p-3">
                            {link.date}
                        </td>
                        <td className="p-3">
                            <button
                                onClick={()=>copy(link.short)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                            >
                                Copy
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}


export default MyLinks;