import { useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface CollapsibleSidebarProps {
  children: ReactNode;
  className?: string;
}

export function CollapsibleSidebar({ children, className }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {children}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  isCollapsed?: boolean;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  label,
  isCollapsed,
  isActive,
  href,
  onClick,
}: SidebarItemProps) {
  const content = (
    <div
      className={cn(
        'group flex items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground',
        isActive && 'bg-accent text-accent-foreground',
        isCollapsed ? 'justify-center' : 'space-x-3'
      )}
      onClick={onClick}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{content}</div>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

interface SidebarSectionProps {
  children: ReactNode;
  title?: string;
  isCollapsed?: boolean;
}

export function SidebarSection({ children, title, isCollapsed }: SidebarSectionProps) {
  return (
    <div className="space-y-3">
      {title && !isCollapsed && (
        <h3 className="px-3 text-xs font-semibold text-foreground/60">{title}</h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
