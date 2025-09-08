import React from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MemberSidebar } from '@/components/admin/MemberSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MemberLayoutProps {
  children: React.ReactNode;
}

export const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='flex'>
        {/* Mobile Sidebar */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='fixed left-4 top-4 z-40 lg:hidden'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 w-72'>
              <MemberSidebar isCollapsed={false} />
            </SheetContent>
          </Sheet>
        ) : (
          // Desktop Sidebar
          <div
            className={cn(
              'sticky top-0 h-screen flex-shrink-0 transition-all duration-300 ease-in-out hidden lg:block',
              isCollapsed ? 'w-16' : 'w-64'
            )}
          >
            <MemberSidebar isCollapsed={isCollapsed} />

            {/* Collapse Toggle Button */}
            <Button
              variant='ghost'
              size='icon'
              className='absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background shadow-md'
              onClick={toggleSidebar}
            >
              {isCollapsed ? <ChevronRight className='h-4 w-4' /> : <ChevronLeft className='h-4 w-4' />}
            </Button>
          </div>
        )}

        {/* Main Content */}
        <main className='flex-1 min-w-0'>
          <div
            className={cn(
              'mx-auto px-4 py-6 transition-all duration-300 ease-in-out',
              isMobile ? 'pt-16' : '',
              !isMobile && 'max-w-6xl'
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
