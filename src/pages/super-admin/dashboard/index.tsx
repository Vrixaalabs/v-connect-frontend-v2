import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { MotionCard } from '@/components/ui/motion-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Building2,
  Users,
  School,
  Activity,
  TrendingUp,
  UserPlus,
  Bell,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { GET_SUPER_ADMIN_DASHBOARD_STATS, GET_RECENT_ACTIVITIES, GET_SYSTEM_STATUS } from '@/graphql/queries';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/useToast';

const SuperAdminDashboard = () => {
  const toast = useToast();

  const { data: statsData, loading: statsLoading, error: statsError } = useQuery(GET_SUPER_ADMIN_DASHBOARD_STATS, {
    onError: (error) => {
      toast.error('Failed to load dashboard stats', error.message);
    },
  });

  const { data: activitiesData, loading: activitiesLoading, error: activitiesError } = useQuery(GET_RECENT_ACTIVITIES, {
    variables: { limit: 5 },
    onError: (error) => {
      toast.error('Failed to load recent activities', error.message);
    },
  });

  const { data: systemData, loading: systemLoading, error: systemError } = useQuery(GET_SYSTEM_STATUS, {
    pollInterval: 30000, // Poll every 30 seconds
    onError: (error) => {
      toast.error('Failed to load system status', error.message);
    },
  });

  if (statsLoading || activitiesLoading || systemLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (statsError || activitiesError || systemError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to Load Dashboard</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
      </div>
    );
  }
  const stats = [
    {
      title: 'Total Institutes',
      value: statsData?.getSuperAdminDashboardStats.totalInstitutes.toString() || '0',
      icon: Building2,
      color: 'text-blue-500',
    },
    {
      title: 'Total Students',
      value: statsData?.getSuperAdminDashboardStats.totalStudents.toString() || '0',
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Total Departments',
      value: statsData?.getSuperAdminDashboardStats.totalDepartments.toString() || '0',
      icon: School,
      color: 'text-purple-500',
    },
    {
      title: 'Active Admins',
      value: statsData?.getSuperAdminDashboardStats.activeAdmins.toString() || '0',
      icon: Shield,
      color: 'text-orange-500',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'institute_added':
        return Building2;
      case 'admin_assigned':
        return UserPlus;
      case 'notification':
        return Bell;
      default:
        return Activity;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  interface Activity {
    id: string;
    type: string;
    message: string;
    time: string;
    instituteId?: string;
    userId?: string;
  }

  const recentActivities = activitiesData?.getRecentActivities.map((activity: Activity) => ({
    type: activity.type,
    message: activity.message,
    time: formatTime(activity.time),
    icon: getActivityIcon(activity.type),
  })) || [];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, Super Admin</p>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MotionCard
            key={stat.title}
            delay={index * 0.1}
            className="bg-card"
          >
            <div className="flex items-center gap-4">
                              <div className={cn("p-3 rounded-full bg-muted", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MotionCard className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity: { type: string; message: string; time: string; icon: any }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-full bg-muted">
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionCard>

        <MotionCard className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                <span>System Status</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "bg-opacity-10",
                  systemData?.getSystemStatus.status === 'operational' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                )}
              >
                {systemData?.getSystemStatus.status === 'operational' ? 'Operational' : 'Issues Detected'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>System Load</span>
              </div>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${Math.min(systemData?.getSystemStatus.load * 100 || 0, 100)}%` }}
                />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Last updated: {new Date(systemData?.getSystemStatus.lastUpdated || Date.now()).toLocaleString()}
            </div>
          </div>
        </MotionCard>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
