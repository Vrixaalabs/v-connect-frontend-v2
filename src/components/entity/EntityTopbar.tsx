import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ENTITY_BY_ENTITY_ID } from '@/graphql/queries';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  Calendar,
  Settings,
  ChevronLeft,
  Bell,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tabs = [
  {
    label: 'Overview',
    icon: Building2,
    href: '',
  },
  {
    label: 'Members',
    icon: Users,
    href: '/members',
  },
  {
    label: 'Events',
    icon: Calendar,
    href: '/events',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export default function EntityTopbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log('[EntityTopbar] id =', id);

  const { data, loading } = useQuery(GET_ENTITY_BY_ENTITY_ID, {
    variables: { entityId: id },
    skip: !id,
  });

  const entity = data?.getEntityByEntityId?.entity;

  const handleTabClick = (href: string) => {
    navigate(`/member/entities/${id}${href}`);
  };

  const handleBack = () => {
    navigate('/member/entities');
  };

  if (loading) {
    return (
      <div className="border-b">
        <div className="container flex items-center gap-4 py-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

  if (!entity) {
    return null;
  }

  const currentTab = tabs.find(
    (tab) => location.pathname === `/member/entities/${id}${tab.href}`
  );

  return (
    <div className="border-b">
      <div className="container py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{entity.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{entity.type}</Badge>
                <Badge variant={entity.status === 'ACTIVE' ? 'default' : 'secondary'}>
                  {/* {entity.status.charAt(0) + entity.status.slice(1).toLowerCase()} */}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit Entity</DropdownMenuItem>
                <DropdownMenuItem>Manage Roles</DropdownMenuItem>
                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Archive Entity
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab?.href === tab.href;

            return (
              <Button
                key={tab.href}
                variant="ghost"
                className={cn(
                  'flex items-center gap-2',
                  isActive && 'bg-primary/10 text-primary'
                )}
                onClick={() => handleTabClick(tab.href)}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
