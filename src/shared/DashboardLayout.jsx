import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardNav";

export default function DashboardLayout() {
  return (
    <div className="d-flex min-vh-100 over">
      <DashboardSidebar />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f4f4f4" }}>
        <Outlet />
        {/* {children} */}
      </div>
    </div>
  );
}
