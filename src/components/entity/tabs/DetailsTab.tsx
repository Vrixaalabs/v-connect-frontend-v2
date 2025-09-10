import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Entity } from '@/types/entity';
import { format } from 'date-fns';

export default function DetailsTab({ entity }: { entity: Entity }) {
  console.log(entity);
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <p className='text-sm font-medium'>Type</p>
            <Badge variant='outline' className='mt-1'>
              {entity.type.charAt(0) + entity.type.slice(1).toLowerCase()}
            </Badge>
          </div>

          {entity.description && (
            <div>
              <p className='text-sm font-medium'>Description</p>
              <p className='text-sm text-gray-500 mt-1'>{entity.description}</p>
            </div>
          )}

          {entity.parentEntityId && (
            <div>
              <p className='text-sm font-medium'>Parent Entity</p>
              <p className='text-sm text-gray-500 mt-1'>{entity.parentEntityId}</p>
            </div>
          )}

          <div>
            <p className='text-sm font-medium'>Created</p>
            <p className='text-sm text-gray-500 mt-1'>{format(new Date(parseInt(entity.createdAt)), 'PPP')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <p className='text-sm font-medium'>Total Members</p>
            <p className='text-2xl font-bold mt-1'>{entity.metadata?.totalMembers || 0}</p>
          </div>

          <div>
            <p className='text-sm font-medium'>Total Events</p>
            <p className='text-2xl font-bold mt-1'>{entity.metadata?.totalEvents || 0}</p>
          </div>

          <div>
            <p className='text-sm font-medium'>Last Activity</p>
            <p className='text-sm text-gray-500 mt-1'>
              {entity.metadata?.lastActivityAt
                ? format(new Date(entity.metadata.lastActivityAt), 'PPP')
                : 'No activity yet'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
