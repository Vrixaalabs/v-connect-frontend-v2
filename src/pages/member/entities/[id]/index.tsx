import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ENTITY_BY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function EntityDetailsPage() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_ENTITY_BY_ID, {
    variables: { id },
  });

  const entity = data?.getEntityById?.entity;

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold">Entity not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{entity.name}</h1>
          <p className="text-sm text-gray-500">Code: {entity.code}</p>
        </div>
        <Badge variant={entity.status === 'ACTIVE' ? 'default' : 'secondary'}>
          {entity.status.charAt(0) + entity.status.slice(1).toLowerCase()}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <Badge variant="outline" className="mt-1">
                    {entity.type.charAt(0) + entity.type.slice(1).toLowerCase()}
                  </Badge>
                </div>

                {entity.description && (
                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-gray-500 mt-1">{entity.description}</p>
                  </div>
                )}

                {entity.parentEntityId && (
                  <div>
                    <p className="text-sm font-medium">Parent Entity</p>
                    <p className="text-sm text-gray-500 mt-1">{entity.parentEntity?.name || entity.parentEntityId}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-gray-500 mt-1">{format(new Date(entity.createdAt), 'PPP')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Total Members</p>
                  <p className="text-2xl font-bold mt-1">{entity.metadata?.totalMembers || 0}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Total Events</p>
                  <p className="text-2xl font-bold mt-1">{entity.metadata?.totalEvents || 0}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Last Activity</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {entity.metadata?.lastActivityAt
                      ? format(new Date(entity.metadata.lastActivityAt), 'PPP')
                      : 'No activity yet'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add members list component */}
              <p className="text-sm text-gray-500">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add events list component */}
              <p className="text-sm text-gray-500">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add activity feed component */}
              <p className="text-sm text-gray-500">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
