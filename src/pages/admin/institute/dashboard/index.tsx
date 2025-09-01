import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import InstituteAdminLayout from '@/components/admin/institute/InstituteAdminLayout';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const StatsCard = ({ title, value, description, trend, trendValue }: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold">{value}</p>
          {trend && trendValue && (
            <span className={`ml-2 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Card>
  );
};

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
  };
}

const RecentActivity = ({ activities }: { activities: ActivityItem[] }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.description}</p>
            <div className="flex items-center mt-1 space-x-2">
              <span className="text-xs text-gray-500">{activity.user.name}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual data from your backend
  const mockStats = {
    totalStudents: 1250,
    activeClubs: 15,
    pendingRequests: 8,
    totalEvents: 24,
  };

  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'student_joined',
      description: 'New student joined Computer Science department',
      timestamp: '2 hours ago',
      user: {
        name: 'John Doe',
        role: 'Student',
      },
    },
    {
      id: '2',
      type: 'club_created',
      description: 'New club "Photography Club" was created',
      timestamp: '5 hours ago',
      user: {
        name: 'Jane Smith',
        role: 'Club Admin',
      },
    },
    {
      id: '3',
      type: 'event_scheduled',
      description: 'Technical Workshop scheduled for next week',
      timestamp: '1 day ago',
      user: {
        name: 'Mike Johnson',
        role: 'Faculty',
      },
    },
  ];

  return (
    <InstituteAdminLayout
      title="Dashboard"
      description="Manage your institute dashboard"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Institute Dashboard</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Students"
              value={mockStats.totalStudents}
              description="Active students in the institute"
              trend="up"
              trendValue="5%"
            />
            <StatsCard
              title="Active Clubs"
              value={mockStats.activeClubs}
              description="Currently active clubs"
            />
            <StatsCard
              title="Pending Requests"
              value={mockStats.pendingRequests}
              description="Requests awaiting approval"
            />
            <StatsCard
              title="Total Events"
              value={mockStats.totalEvents}
              description="Events this month"
              trend="up"
              trendValue="12%"
            />
          </div>

          {/* Add more overview content here */}
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <RecentActivity activities={mockActivities} />
          </Card>
        </TabsContent>
      </Tabs>
    </InstituteAdminLayout>
  );
}
