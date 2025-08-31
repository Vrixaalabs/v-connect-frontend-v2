import { motion } from 'framer-motion';
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
} from 'lucide-react';

const SuperAdminDashboard = () => {
  // TODO: Replace with actual API data
  const stats = [
    {
      title: 'Total Institutes',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Building2,
      color: 'text-blue-500',
    },
    {
      title: 'Total Students',
      value: '12.5k',
      change: '+256',
      trend: 'up',
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Total Departments',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: School,
      color: 'text-purple-500',
    },
    {
      title: 'Active Admins',
      value: '48',
      change: '+5',
      trend: 'up',
      icon: Shield,
      color: 'text-orange-500',
    },
  ];

  const recentActivities = [
    {
      type: 'institute_added',
      message: 'New institute "MIT" was added',
      time: '2 hours ago',
      icon: Building2,
    },
    {
      type: 'admin_assigned',
      message: 'New admin assigned to "Harvard University"',
      time: '3 hours ago',
      icon: UserPlus,
    },
    {
      type: 'notification',
      message: 'System maintenance scheduled for next week',
      time: '5 hours ago',
      icon: Bell,
    },
  ];

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
                  <span className={cn(
                    "text-sm",
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  )}>
                    {stat.change}
                  </span>
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
            {recentActivities.map((activity, index) => (
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
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>System Load</span>
              </div>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-blue-500" />
              </div>
            </div>
          </div>
        </MotionCard>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
