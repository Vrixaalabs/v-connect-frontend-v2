import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MotionCard } from '@/components/ui/motion-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Mail, Shield, Key, Globe, Database, AlertCircle } from 'lucide-react';
import { GET_SUPER_ADMIN_SETTINGS } from '@/graphql/queries';
import {
  UPDATE_SUPER_ADMIN_PROFILE,
  UPDATE_SUPER_ADMIN_PASSWORD,
  UPDATE_SUPER_ADMIN_SETTINGS,
} from '@/graphql/mutations';
import { useToast } from '@/hooks/useToast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SuperAdminSettings {
  emailNotifications: boolean;
  twoFactorAuth: boolean;
  maintenanceMode: boolean;
  notifyOnNewInstitute: boolean;
  notifyOnSystemAlerts: boolean;
  notifyOnSecurityAlerts: boolean;
}

interface SuperAdminProfile {
  id: string;
  email: string;
  fullName: string;
}

const SuperAdminSettings = () => {
  const toast = useToast();
  const [profile, setProfile] = useState<SuperAdminProfile>({
    id: '',
    email: '',
    fullName: '',
  });
  const [settings, setSettings] = useState<SuperAdminSettings>({
    emailNotifications: true,
    twoFactorAuth: false,
    maintenanceMode: false,
    notifyOnNewInstitute: true,
    notifyOnSystemAlerts: true,
    notifyOnSecurityAlerts: true,
  });
  const [newPassword, setNewPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [_, setIsChangePasswordModalOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_SUPER_ADMIN_SETTINGS, {
    onCompleted: data => {
      if (data.getSuperAdminSettings.success) {
        setProfile(data.getSuperAdminSettings.user);
        setSettings(data.getSuperAdminSettings.settings);
      } else {
        toast.error('Failed to load settings', data.getSuperAdminSettings.message);
      }
    },
    onError: error => {
      toast.error('Failed to load settings', error.message);
    },
  });

  const [updateProfile, { loading: updatingProfile }] = useMutation(UPDATE_SUPER_ADMIN_PROFILE, {
    onCompleted: data => {
      if (data.updateSuperAdminProfile.success) {
        toast.success('Profile updated successfully');
        setProfile(data.updateSuperAdminProfile.user);
      } else {
        toast.error('Failed to update profile', data.updateSuperAdminProfile.message);
      }
    },
    onError: error => {
      toast.error('Failed to update profile', error.message);
    },
  });

  const [updatePassword ] = useMutation(UPDATE_SUPER_ADMIN_PASSWORD, {
    onCompleted: data => {
      if (data.updateSuperAdminPassword.success) {
        toast.success('Password updated successfully');
        setIsChangePasswordModalOpen(false);
        setNewPassword({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error('Failed to update password', data.updateSuperAdminPassword.message);
      }
    },
    onError: error => {
      toast.error('Failed to update password', error.message);
    },
  });

  const [updateSettings, { loading: updatingSettings }] = useMutation(UPDATE_SUPER_ADMIN_SETTINGS, {
    onCompleted: data => {
      if (data.updateSuperAdminSettings.success) {
        toast.success('Settings updated successfully');
        setSettings(data.updateSuperAdminSettings.settings);
      } else {
        toast.error('Failed to update settings', data.updateSuperAdminSettings.message);
      }
    },
    onError: error => {
      toast.error('Failed to update settings', error.message);
    },
  });

  const handleUpdateProfile = async () => {
    await updateProfile({
      variables: {
        input: {
          fullName: profile.fullName,
          email: profile.email,
        },
      },
    });
  };

  // const handleUpdatePassword = async () => {
  //   if (newPassword.newPassword !== newPassword.confirmPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }

  //   await updatePassword({
  //     variables: {
  //       input: {
  //         currentPassword: newPassword.currentPassword,
  //         newPassword: newPassword.newPassword,
  //       },
  //     },
  //   });
  // };

  const handleUpdateSettings = async (updates: Partial<SuperAdminSettings>) => {
    await updateSettings({
      variables: {
        input: {
          ...settings,
          ...updates,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
        <AlertCircle className='w-12 h-12 text-red-500 mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Failed to Load Settings</h2>
        <p className='text-muted-foreground'>Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 space-y-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold'>Settings</h1>
          <p className='text-muted-foreground'>Manage your super admin preferences</p>
        </div>
      </div>

      <Tabs defaultValue='account' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='system'>System</TabsTrigger>
        </TabsList>

        <TabsContent value='account'>
          <div className='grid gap-6'>
            <MotionCard>
              <h2 className='text-xl font-semibold mb-4'>Profile Information</h2>
              <div className='space-y-4'>
                <div className='grid gap-2'>
                  <Label>Full Name</Label>
                  <Input
                    placeholder='John Doe'
                    value={profile.fullName}
                    onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label>Email</Label>
                  <Input
                    type='email'
                    placeholder='john@example.com'
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <Button onClick={handleUpdateProfile} disabled={updatingProfile}>
                  {updatingProfile ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </MotionCard>
          </div>
        </TabsContent>

        <TabsContent value='security'>
          <div className='grid gap-6'>
            <MotionCard>
              <h2 className='text-xl font-semibold mb-4'>Security Settings</h2>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Key className='w-4 h-4' />
                      <span className='font-medium'>Change Password</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Update your password regularly</p>
                  </div>
                  <Button variant='outline'>Change</Button>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Shield className='w-4 h-4' />
                      <span className='font-medium'>Two-Factor Authentication</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={checked => handleUpdateSettings({ twoFactorAuth: checked })}
                    disabled={updatingSettings}
                  />
                </div>
              </div>
            </MotionCard>
          </div>
        </TabsContent>

        <TabsContent value='notifications'>
          <div className='grid gap-6'>
            <MotionCard>
              <h2 className='text-xl font-semibold mb-4'>Notification Preferences</h2>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Mail className='w-4 h-4' />
                      <span className='font-medium'>Email Notifications</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={checked => handleUpdateSettings({ emailNotifications: checked })}
                    disabled={updatingSettings}
                  />
                </div>

                <div className='space-y-4'>
                  <h3 className='font-medium'>Notify me about:</h3>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Switch
                        checked={settings.notifyOnNewInstitute}
                        onCheckedChange={checked => handleUpdateSettings({ notifyOnNewInstitute: checked })}
                        disabled={updatingSettings}
                      />
                      <Label>New institute registrations</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Switch
                        checked={settings.notifyOnSystemAlerts}
                        onCheckedChange={checked => handleUpdateSettings({ notifyOnSystemAlerts: checked })}
                        disabled={updatingSettings}
                      />
                      <Label>System alerts</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Switch
                        checked={settings.notifyOnSecurityAlerts}
                        onCheckedChange={checked => handleUpdateSettings({ notifyOnSecurityAlerts: checked })}
                        disabled={updatingSettings}
                      />
                      <Label>Security alerts</Label>
                    </div>
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>
        </TabsContent>

        <TabsContent value='system'>
          <div className='grid gap-6'>
            <MotionCard>
              <h2 className='text-xl font-semibold mb-4'>System Settings</h2>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Globe className='w-4 h-4' />
                      <span className='font-medium'>Maintenance Mode</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Enable maintenance mode for all users</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={checked => handleUpdateSettings({ maintenanceMode: checked })}
                    disabled={updatingSettings}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Database className='w-4 h-4' />
                      <span className='font-medium'>System Backup</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Last backup: 2 days ago</p>
                  </div>
                  <Button variant='outline'>Backup Now</Button>
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
