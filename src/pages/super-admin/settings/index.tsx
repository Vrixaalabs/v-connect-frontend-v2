import { useState } from 'react';
import { MotionCard } from '@/components/ui/motion-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Mail,
  Shield,
  Key,
  Globe,
  Database,
} from 'lucide-react';

const SuperAdminSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your super admin preferences</p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6">
            <MotionCard>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <Button>Update Profile</Button>
              </div>
            </MotionCard>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <MotionCard>
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      <span className="font-medium">Change Password</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly
                    </p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Two-Factor Authentication</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
              </div>
            </MotionCard>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid gap-6">
            <MotionCard>
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Email Notifications</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Notify me about:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>New institute registrations</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>System alerts</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>Security alerts</Label>
                    </div>
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid gap-6">
            <MotionCard>
              <h2 className="text-xl font-semibold mb-4">System Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">Maintenance Mode</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode for all users
                    </p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span className="font-medium">System Backup</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last backup: 2 days ago
                    </p>
                  </div>
                  <Button variant="outline">Backup Now</Button>
                </div>
              </div>
            </MotionCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSettings;
