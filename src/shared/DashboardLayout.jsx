import { Outlet } from 'react-router-dom';
import PageHeader from './dashboardHeader';
import DashboardSidebar from './DashboardNav';
import LoadingOverlay from './loadingOverlay';

export default function DashboardLayout() {
  return (
    <div
      className="d-flex min-vh-100 over"
      style={{ backgroundColor: '#f4f4f4' }}
    >
      <DashboardSidebar />
      <div className="flex-grow-1">
        <PageHeader />

        <div className=" p-4">
          <Outlet />
          {/* {children} */}
        </div>
      </div>
      <LoadingOverlay />
    </div>
  );
}
