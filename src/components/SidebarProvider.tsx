import React, { useState, useCallback, useEffect } from 'react';
import { SidebarContext, type AdminType } from './ui/sidebar-context';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [state, setState] = useState<'expanded' | 'collapsed'>('expanded');
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const [adminType, setAdminType] = useState<AdminType>('club');
  const isMobile = useIsMobile();

  const toggleSidebar = useCallback(() => {
    setState((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
  }, []);

  // Close mobile sidebar when switching between mobile and desktop
  useEffect(() => {
    setOpenMobile(false);
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
        adminType,
        setAdminType,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
