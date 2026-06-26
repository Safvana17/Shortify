import React, {useState} from "react";
import UserHeader from "../../components/UserHeader";
import UserSidebar from "../../components/UserSidebar";

import CreateLink from "./CreateLink";
import MyLinks from "./MyLinks";


const Dashboard: React.FC = () => {
    const [activePage,setActivePage] = useState("create");

    const renderPage =()=>{
        switch(activePage){
            case "links":
                return <MyLinks/>;
            default:
                return <CreateLink/>;
        }
    }
return (
    <div className="min-h-screen bg-gray-50">
        <UserHeader userName="Safvana" onLogout={()=>console.log("logout")} />
        <div className="flex">
            <UserSidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-1 p-10">
                { renderPage() }
            </main>
        </div>
    </div>
)}


export default Dashboard;