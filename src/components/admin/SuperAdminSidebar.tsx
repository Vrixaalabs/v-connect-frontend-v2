import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, Settings } from 'lucide-react';
import { CollapsibleSidebar, SidebarItem, SidebarSection } from '@/components/ui/collapsible-sidebar';

export default function SuperAdminSidebar() {
  const [isCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      title: 'Overview',
      items: [
        {
          icon: <LayoutDashboard className='h-4 w-4' />,
          label: 'Dashboard',
          href: '/super-admin/dashboard',
        },
        {
          icon: <Building2 className='h-4 w-4' />,
          label: 'Institutes',
          href: '/super-admin/institutes',
        },
        {
          icon: <Users className='h-4 w-4' />,
          label: 'Admins',
          href: '/super-admin/admins',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          icon: <Settings className='h-4 w-4' />,
          label: 'Settings',
          href: '/super-admin/settings',
        },
      ],
    },
  ];

  return (
    <CollapsibleSidebar>
      <div className='flex h-14 items-center border-b px-3'>
        <Link
          to='/super-admin/dashboard'
          className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center' : ''}`}
        >
          {!isCollapsed && <span className='font-bold'>Super Admin</span>}
        </Link>
      </div>

      <div className='flex-1 overflow-auto py-6'>
        <nav className='grid gap-6 px-2'>
          {navigationItems.map((section, i) => (
            <SidebarSection key={i} title={section.title} isCollapsed={isCollapsed}>
              {section.items.map((item, j) => (
                <Link key={j} to={item.href}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    isActive={isActive(item.href)}
                    isCollapsed={isCollapsed}
                  />
                </Link>
              ))}
            </SidebarSection>
          ))}
        </nav>
      </div>
    </CollapsibleSidebar>
  );
}
