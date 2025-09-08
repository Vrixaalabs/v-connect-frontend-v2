import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ENTITY_BY_ENTITY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar as CalendarIcon, Plus, MapPin, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function EntityEventsPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const entityId = state?.entityId || id;

  const { data, loading } = useQuery(GET_ENTITY_BY_ENTITY_ID, {
    variables: { entityId },
    skip: !entityId,
  });

  const entity = data?.getEntityByEntityId?.entity;
  const events: Array<any> = []; // TODO: Replace with actual events data

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
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Events</h1>
          <p className='text-sm text-gray-500'>{entity.name}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            {/* TODO: Add event form */}
            <p className='text-sm text-gray-500'>Coming soon...</p>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {events.map((event: any) => (
          <Card key={event.id}>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Badge variant='outline'>{event.type}</Badge>
                <Badge>{event.status}</Badge>
              </div>
              <CardTitle className='mt-2'>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <CalendarIcon className='h-4 w-4' />
                  <span>{format(new Date(event.startDate), 'PPP')}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <Clock className='h-4 w-4' />
                  <span>{format(new Date(event.startTime), 'p')}</span>
                </div>
                {event.venue && (
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <MapPin className='h-4 w-4' />
                    <span>{event.venue}</span>
                  </div>
                )}
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <Users className='h-4 w-4' />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {events.length === 0 && (
          <Card className='col-span-full'>
            <CardContent className='text-center py-8'>
              <p className='text-sm text-gray-500'>No events found</p>
              <DialogTrigger asChild>
                <Button variant='link' className='mt-2'>
                  Create your first event
                </Button>
              </DialogTrigger>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
