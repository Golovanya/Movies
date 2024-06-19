import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function Layout() {
    return ( 
        <>
         <Header/>
       <main className="flex h-full">
        <SideBar/>
        <Outlet/>
       </main>
    
        </>
       );
}

export default Layout;