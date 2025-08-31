import { Outlet } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Super Admin Dashboard</h1>
      
      <Tabs
        value={currentPath}
        onValueChange={(value) => navigate(`/super-admin/${value}`)}
        className="mb-8"
      >
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="institutes">Institutes</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>

      <Outlet />
    </div>
  );
};

export default SuperAdminLayout;
