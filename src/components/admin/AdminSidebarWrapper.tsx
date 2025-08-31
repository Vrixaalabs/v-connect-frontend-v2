import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';
import { InstituteAdminSidebar } from './InstituteAdminSidebar';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { useSidebar } from '@/components/ui/sidebar-context';
import type { AdminType } from '@/components/ui/sidebar-context';

export function AdminSidebarWrapper() {
  const { pathname } = useLocation();
  const { setAdminType } = useSidebar();

  useEffect(() => {
    let adminType: AdminType = 'club';

    if (pathname.startsWith('/admin/institute')) {
      adminType = 'institute';
    } else if (pathname.startsWith('/super-admin')) {
      adminType = 'super';
    }

    setAdminType(adminType);
  }, [pathname, setAdminType]);

  if (pathname.startsWith('/admin/institute')) {
    return <InstituteAdminSidebar />;
  }

  if (pathname.startsWith('/super-admin')) {
    return <SuperAdminSidebar />;
  }

  return <AdminSidebar />;
}
