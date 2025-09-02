import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  Settings,
  Building2,
  Club,
} from 'lucide-react';
import {
  CollapsibleSidebar,
  SidebarItem,
  SidebarSection,
} from '@/components/ui/collapsible-sidebar';

export default function InstituteAdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      title: 'Overview',
      items: [
        {
          icon: <LayoutDashboard className="h-4 w-4" />,
          label: 'Dashboard',
          href: '/admin/institute/dashboard',
        },
        {
          icon: <Users className="h-4 w-4" />,
          label: 'Students',
          href: '/admin/institute/students',
        },
        {
          icon: <GraduationCap className="h-4 w-4" />,
          label: 'Invite Student',
          href: '/admin/institute/students/invite',
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          icon: <Building2 className="h-4 w-4" />,
          label: 'Entities',
          href: '/admin/institute/entities',
        },
        {
          icon: <Club className="h-4 w-4" />,
          label: 'Clubs',
          href: '/admin/institute/clubs',
        },
        {
          icon: <ClipboardList className="h-4 w-4" />,
          label: 'Requests',
          href: '/admin/institute/requests',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          icon: <Settings className="h-4 w-4" />,
          label: 'Settings',
          href: '/admin/institute/settings',
        },
      ],
    },
  ];

  return (
    <CollapsibleSidebar>
      <div className="flex h-14 items-center border-b px-3">
        <Link
          to="/admin/institute/dashboard"
          className={`flex items-center space-x-2 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {!isCollapsed && <span className="font-bold">Institute Admin</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-6">
        <nav className="grid gap-6 px-2">
          {navigationItems.map((section, i) => (
            <SidebarSection
              key={i}
              title={section.title}
              isCollapsed={isCollapsed}
            >
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
