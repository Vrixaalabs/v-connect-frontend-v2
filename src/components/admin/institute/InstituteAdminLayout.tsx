import { type ReactNode } from 'react';

interface InstituteAdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function InstituteAdminLayout({
  children,
  title,
  description,
  action,
}: InstituteAdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
  );
}
