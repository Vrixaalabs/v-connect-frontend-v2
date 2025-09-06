import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  UserCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@/components/organization/OrganizationSwitcher';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface MemberSidebarProps {
  isCollapsed?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  { icon: Home, label: 'Feed', href: '/feed' },
  { icon: Users, label: 'Network', href: '/network' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: BookOpen, label: 'Clubs', href: '/clubs' },
  { icon: GraduationCap, label: 'Alumni', href: '/alumni' },
  { icon: Briefcase, label: 'Jobs', href: '/jobs' },
  { icon: Award, label: 'Achievements', href: '/achievements' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: UserCircle, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const MemberSidebar: React.FC<MemberSidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Organization Switcher */}
      <div className={cn("border-b", isCollapsed ? "p-2" : "p-4")}>
        {!isCollapsed && <OrganizationSwitcher />}
      </div>

      {/* Navigation Links */}
      <ScrollArea className="flex-1 py-2">
        <nav className={cn("space-y-1", isCollapsed ? "px-1" : "px-2")}>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-x-3 py-2 text-sm font-medium rounded-lg transition-colors relative group',
                  isCollapsed ? 'justify-center px-2' : 'px-3',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground/70"
                )} />
                {!isCollapsed && link.label}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      <div className={cn(
        "mt-auto border-t bg-muted/50",
        isCollapsed ? "p-2" : "p-4"
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "gap-x-3"
        )}>
          <div className={cn(
            "rounded-full bg-primary/10 flex items-center justify-center",
            isCollapsed ? "h-8 w-8" : "h-9 w-9"
          )}>
            <UserCircle className={cn(
              "text-primary",
              isCollapsed ? "h-4 w-4" : "h-5 w-5"
            )} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <div className="text-sm font-semibold">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {user?.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberSidebar;
