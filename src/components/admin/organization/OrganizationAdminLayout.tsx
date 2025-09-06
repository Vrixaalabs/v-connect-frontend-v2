import { type ReactNode } from 'react';
import TopNav from '@/components/navigation/TopNav';
import OrganizationAdminSidebar from './OrganizationAdminSidebar';

interface OrganizationAdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function OrganizationAdminLayout({
  children,
  title,
  description,
  action,
}: OrganizationAdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="flex">
        <OrganizationAdminSidebar />
        <div className="flex-1">
          <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && (
                  <p className="text-gray-500">{description}</p>
                )}
              </div>
              {action && (
                <div>{action}</div>
              )}
            </div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}