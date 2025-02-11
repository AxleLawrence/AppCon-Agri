import { Outlet } from "react-router-dom";
import Navbar from "./DB_Navbar";
import Sidebar from "./Sidebar1";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
