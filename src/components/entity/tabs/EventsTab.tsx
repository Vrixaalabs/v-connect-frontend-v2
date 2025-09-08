import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import { Card as CardUI } from '@/components/ui/card';

export default function EventsTab({ events }: { events: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent>
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
            <>
                <p className='text-sm text-gray-500'>No events found</p>
                {/* <DialogTrigger asChild>
                <Button variant='link' className='mt-2'>
                    Create your first event
                </Button>
                </DialogTrigger> */}
            </>
        )}
      </div>
      </CardContent>
    </Card>
  );
}
