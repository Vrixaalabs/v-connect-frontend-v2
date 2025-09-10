import React from 'react';
import { Link } from 'react-router-dom';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Bell,
  Lock,
  Shield,
  Globe,
  Mail,
  Smartphone,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const settingsGroups = [
  {
    title: 'Account',
    description: 'Manage your account settings and preferences',
    items: [
      {
        icon: User,
        label: 'Account Settings',
        description: 'Update your account information and email preferences',
        href: '/member/settings/account',
      },
      {
        icon: Bell,
        label: 'Notifications',
        description: 'Configure how you receive notifications',
        href: '/member/notifications',
      },
      {
        icon: Lock,
        label: 'Password & Security',
        description: 'Update your password and security settings',
        href: '/member/settings/account',
      },
    ],
  },
  {
    title: 'Privacy',
    description: 'Control your privacy settings and data',
    items: [
      {
        icon: Shield,
        label: 'Privacy Settings',
        description: 'Manage who can see your information',
        href: '/member/settings/privacy',
      },
      {
        icon: Globe,
        label: 'Profile Visibility',
        description: 'Control your profile visibility and searchability',
        href: '/member/settings/privacy',
      },
    ],
  },
  {
    title: 'Communication',
    description: 'Manage your communication preferences',
    items: [
      {
        icon: Mail,
        label: 'Email Preferences',
        description: 'Choose which emails you want to receive',
        href: '/member/settings/account',
      },
      {
        icon: Smartphone,
        label: 'Mobile Notifications',
        description: 'Configure mobile app notifications',
        href: '/member/notifications',
      },
    ],
  },
];

const SettingsPage: React.FC = () => {
  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Groups */}
        <div className="space-y-8">
          {settingsGroups.map((group, index) => (
            <div key={index} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{group.title}</h2>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <Link key={itemIndex} to={item.href}>
                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{item.label}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sign Out</h3>
                <p className="text-sm text-muted-foreground">
                  Sign out from all devices
                </p>
              </div>
              <Button variant="outline" className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default SettingsPage;