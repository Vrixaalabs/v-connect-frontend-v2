import { Outlet } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';

const InstituteAdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>Institute Administration</h1>

      <Tabs value={currentPath} onValueChange={value => navigate(`/admin/institute/${value}`)} className='mb-8'>
        <TabsList>
          <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
          <TabsTrigger value='students'>Students</TabsTrigger>
          <TabsTrigger value='roles'>Roles</TabsTrigger>
          <TabsTrigger value='requests'>Join Requests</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        </TabsList>
      </Tabs>

      <Outlet />
    </div>
  );
};

export default InstituteAdminLayout;
