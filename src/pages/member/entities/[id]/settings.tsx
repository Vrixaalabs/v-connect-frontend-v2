import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ENTITY_BY_ENTITY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EntitySettingsPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const entityId = state?.entityId || id;

  const { data, loading } = useQuery(GET_ENTITY_BY_ENTITY_ID, {
    variables: { entityId },
    skip: !entityId,
  });

  const entity = data?.getEntityByEntityId?.entity;

  if (loading) {
    return (
      <div className='container mx-auto py-6 space-y-6'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-[400px] w-full' />
      </div>
    );
  }

  if (!entity) {
    return (
      <div className='container mx-auto py-6'>
        <h1 className='text-2xl font-bold'>Entity not found</h1>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <p className='text-sm text-gray-500'>{entity.name}</p>
      </div>

      <Tabs defaultValue='general' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='permissions'>Permissions</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='danger'>Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value='general'>
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your entity's basic settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div>
                  <Label>Entity Visibility</Label>
                  <Select defaultValue={entity.settings?.visibility?.toLowerCase()}>
                    <SelectTrigger className='w-full mt-1'>
                      <SelectValue placeholder='Select visibility' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='public'>Public</SelectItem>
                      <SelectItem value='private'>Private</SelectItem>
                      <SelectItem value='organization'>Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Allow Membership Requests</Label>
                    <p className='text-sm text-gray-500'>Let users request to join this entity</p>
                  </div>
                  <Switch checked={entity.settings?.allowMembershipRequests} />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Require Approval</Label>
                    <p className='text-sm text-gray-500'>Require admin approval for new members</p>
                  </div>
                  <Switch checked={entity.settings?.requireApproval} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='permissions'>
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Configure what members can do in this entity</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Allow Posts</Label>
                    <p className='text-sm text-gray-500'>Let members create posts</p>
                  </div>
                  <Switch checked={entity.settings?.allowPosts} />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Allow Events</Label>
                    <p className='text-sm text-gray-500'>Let members create events</p>
                  </div>
                  <Switch checked={entity.settings?.allowEvents} />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Allow Announcements</Label>
                    <p className='text-sm text-gray-500'>Let members create announcements</p>
                  </div>
                  <Switch checked={entity.settings?.allowAnnouncements} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='notifications'>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you want to be notified about entity activities</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>New Member Notifications</Label>
                    <p className='text-sm text-gray-500'>Get notified when new members join</p>
                  </div>
                  <Switch />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Event Notifications</Label>
                    <p className='text-sm text-gray-500'>Get notified about new events</p>
                  </div>
                  <Switch />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Post Notifications</Label>
                    <p className='text-sm text-gray-500'>Get notified about new posts</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='danger'>
          <Card>
            <CardHeader>
              <CardTitle className='text-red-600'>Danger Zone</CardTitle>
              <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-red-600'>Archive Entity</Label>
                    <p className='text-sm text-gray-500'>Archive this entity and all its content</p>
                  </div>
                  <Button variant='destructive'>Archive</Button>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-red-600'>Delete Entity</Label>
                    <p className='text-sm text-gray-500'>Permanently delete this entity and all its content</p>
                  </div>
                  <Button variant='destructive'>Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
