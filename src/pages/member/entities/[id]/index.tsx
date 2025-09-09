import { useParams, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ENTITY_BY_ENTITY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import DetailsTab from '@/components/entity/tabs/DetailsTab';
import MembersTab from '@/components/entity/tabs/MembersTab';
import EventsTab from '@/components/entity/tabs/EventsTab';
import EditTab from '@/components/entity/tabs/EditTab';
import SettingsTab from '@/components/entity/tabs/SettingsTab';
import { toast } from 'sonner';
import { UPDATE_ENTITY } from '@/graphql/mutations';
import MemberLayout from '@/components/layouts/MemberLayout';

export default function EntityDetailsPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const entityId = state?.entityId || id;

  const { data, loading } = useQuery(GET_ENTITY_BY_ENTITY_ID, {
    variables: { entityId },
    skip: !entityId,
  });

  const entity = data?.getEntityByEntityId?.entity;

  const [updateEntity, { loading: updating }] = useMutation(UPDATE_ENTITY);

  if (loading) {
    return (
      <div className='container mx-auto py-6 space-y-6'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-[200px] w-full' />
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

  const handleUpdateEntity = async (formData: any) => {
    try {
      const response = await updateEntity({
        variables: {
          id,
          input: {
            name: formData.name,
            type: formData.type,
            code: formData.code,
            description: formData.description,
            parentEntityId: formData.parentEntityId === 'none' ? null : formData.parentEntityId,
          },
        },
      });

      if (response.data?.updateEntity?.success) {
        toast.success('Entity updated successfully');
      } else {
        throw new Error(response.data?.updateEntity?.message || 'Failed to update entity');
      }
    } catch (error) {
      toast.error('Failed to update entity');
    }
  };

  return (
    <MemberLayout>
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>{entity.name}</h1>
          <p className='text-sm text-gray-500'>Code: {entity.code}</p>
        </div>
        <Badge variant={entity.status === 'ACTIVE' ? 'default' : 'secondary'}>
          {/* {entity.status.charAt(0) + entity.status.slice(1).toLowerCase()} */}
        </Badge>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='edit'>Edit</TabsTrigger>
          <TabsTrigger value='members'>Members</TabsTrigger>
          <TabsTrigger value='events'>Events</TabsTrigger>
          <TabsTrigger value='activity'>Activity</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>

        <TabsContent value='overview'>
          <DetailsTab entity={entity} />
        </TabsContent>

        <TabsContent value='edit'>
          <EditTab handleUpdateEntity={handleUpdateEntity} entity={entity} updating={updating} />
        </TabsContent>

        <TabsContent value='members'>
          <MembersTab entity={entity} />
        </TabsContent>

        <TabsContent value='events'>
          <EventsTab events={entity.events || []} />
        </TabsContent>

        <TabsContent value='activity'>
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add activity feed component */}
              <p className='text-sm text-gray-500'>Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='settings'>
          <SettingsTab entity={entity} />
        </TabsContent>
      </Tabs>
    </div>
    </MemberLayout>
  );
}
