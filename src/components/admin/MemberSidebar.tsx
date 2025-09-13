import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { useQuery } from '@apollo/client';
import { GET_USER_ENTITIES } from '@/graphql/queries';
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
  TrendingUp,
  Megaphone,
  Search,
  MapPin,
  Building2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@/components/organization/OrganizationSwitcher';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: Array<{
    icon: React.ElementType;
    label: string;
    href: string;
  }>;
}

interface MemberSidebarProps {
  isCollapsed?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  {
    icon: Home,
    label: 'Feed',
    href: '/feed',
    subItems: [
      { icon: TrendingUp, label: 'All Posts', href: '/feed' },
      { icon: Megaphone, label: 'Announcements', href: '/feed/announcements' },
      { icon: Search, label: 'Lost & Found', href: '/feed/lost-found' },
      { icon: Calendar, label: 'Club Events', href: '/feed/events' },
      { icon: MapPin, label: 'Campus Updates', href: '/feed/campus' },
    ],
  },
  { icon: MessageSquare, label: 'Feedback', href: '/member/feedback' },
  { icon: Users, label: 'Network', href: '/network' },
  {
    icon: Building2,
    label: 'My Entities',
    href: '/member/entities',
  },
  { icon: Building2, label: 'Join Entity', href: '/member/entities/join' },
  { icon: Building2, label: 'Invites', href: '/member/invites' },
  { icon: BookOpen, label: 'Clubs', href: '/clubs' },
  {
    icon: GraduationCap,
    label: 'Alumni',
    href: '/member/alumni',
    subItems: [
      { icon: Users, label: 'Directory', href: '/member/alumni/directory' },
    ],
  },
  {
    icon: Briefcase,
    label: 'Jobs',
    href: '/member/jobs',
    subItems: [
      { icon: TrendingUp, label: 'Browse Jobs', href: '/member/jobs' },
      { icon: MessageSquare, label: 'Post a Job', href: '/member/jobs/post' },
    ],
  },
  { icon: Award, label: 'Achievements', href: '/member/achievements' },
  {
    icon: MessageSquare,
    label: 'Messages',
    href: '/member/messages',
  },
  { icon: Bell, label: 'Notifications', href: '/member/notifications' },
  {
    icon: UserCircle,
    label: 'Profile',
    href: '/member/profile',
    subItems: [
      { icon: UserCircle, label: 'View Profile', href: '/member/profile' },
      { icon: Settings, label: 'Edit Profile', href: '/member/profile/edit' },
    ],
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/member/settings',
    subItems: [
      { icon: UserCircle, label: 'Account', href: '/member/settings/account' },
      { icon: Settings, label: 'Privacy', href: '/member/settings/privacy' },
    ],
  },
];

export const MemberSidebar: React.FC<MemberSidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();
  const { id: urlEntityId } = useParams();
  const { user } = useAppSelector(state => state.auth);
  const { data: entitiesData, loading: entitiesLoading } = useQuery(GET_USER_ENTITIES);
  console.log('entitiesData', entitiesData);

  // Get the first entity ID if available, otherwise use the URL param

  let firstEntityId = null;
  if (entitiesLoading) {
    firstEntityId = null;
  } else if (entitiesData?.getUserEntities?.entities?.length === 0) {
    firstEntityId = 1;
  } else {
    firstEntityId = entitiesData?.getUserEntities?.entities?.[0]?.entityId;
  }
  const entityId = urlEntityId ?? firstEntityId;

  // Function to replace [entityId] with actual ID in href
  const getEntityUrl = (href: string) => {
    return entityId ? href.replace('[entityId]', entityId) : href;
  };

  // what if no entities are found?
  if (entitiesLoading) {
    return (
      <div className='flex flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='flex-1 flex items-center justify-center'>
            <Loader2 className='h-4 w-4 animate-spin' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      {/* Organization Switcher */}
      <div className={cn('border-b', isCollapsed ? 'p-2' : 'p-4')}>{!isCollapsed && <OrganizationSwitcher />}</div>

      {/* Navigation Links */}
      <ScrollArea className='flex-1 py-2'>
        <nav className={cn('space-y-1', isCollapsed ? 'px-1' : 'px-2')}>
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            const isActive =
              location.pathname === getEntityUrl(link.href) ||
              link.subItems?.some(item => location.pathname === getEntityUrl(item.href));
            const hasSubItems = link.subItems && link.subItems.length > 0;

            return (
              <div key={link.href} className='space-y-1'>
                <Link
                  to={getEntityUrl(link.href)}
                  className={cn(
                    'flex items-center gap-x-3 py-2 text-sm font-medium rounded-lg transition-colors relative group',
                    isCollapsed ? 'justify-center px-2' : 'px-3',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 transition-colors',
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground/70'
                    )}
                  />
                  {!isCollapsed && (
                    <>
                      <span className='flex-1'>{link.label}</span>
                      {hasSubItems && <span className='text-muted-foreground text-xs'>{link.subItems?.length}</span>}
                    </>
                  )}
                  {isCollapsed && (
                    <div className='absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50'>
                      {link.label}
                    </div>
                  )}
                </Link>

                {/* Sub Items */}
                {!isCollapsed && hasSubItems && (
                  <div className='ml-6 space-y-1'>
                    {link.subItems?.map(subItem => {
                      const SubIcon = subItem.icon;
                      const isSubActive = location.pathname === getEntityUrl(subItem.href);

                      return (
                        <Link
                          key={subItem.href}
                          to={getEntityUrl(subItem.href)}
                          className={cn(
                            'flex items-center gap-x-3 py-1.5 px-3 text-sm rounded-md transition-colors',
                            isSubActive
                              ? 'text-primary font-medium bg-primary/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          )}
                        >
                          <SubIcon className='h-3.5 w-3.5' />
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      <div className={cn('mt-auto border-t bg-muted/50', isCollapsed ? 'p-2' : 'p-4')}>
        <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'gap-x-3')}>
          <div
            className={cn(
              'rounded-full bg-primary/10 flex items-center justify-center',
              isCollapsed ? 'h-8 w-8' : 'h-9 w-9'
            )}
          >
            <UserCircle className={cn('text-primary', isCollapsed ? 'h-4 w-4' : 'h-5 w-5')} />
          </div>
          {!isCollapsed && (
            <div className='flex-1 truncate'>
              <div className='text-sm font-semibold'>
                {user?.firstName} {user?.lastName}
              </div>
              <div className='text-xs text-muted-foreground truncate'>{user?.email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberSidebar;
