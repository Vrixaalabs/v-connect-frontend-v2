import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ENTITY_BY_ENTITY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Plus, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function EntityMembersPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const entityId = state?.entityId || id;

  const { data, loading } = useQuery(GET_ENTITY_BY_ENTITY_ID, {
    variables: { entityId },
    skip: !entityId,
  });

  const entity = data?.getEntityByEntityId?.entity;
  const members = entity?.members || [];

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
          <h1 className='text-2xl font-bold'>Members</h1>
          <p className='text-sm text-gray-500'>{entity.name}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            {/* TODO: Add member form */}
            <p className='text-sm text-gray-500'>Coming soon...</p>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {members.map((member: any) => (
              <div key={member.user.userId} className='flex items-center justify-between p-4 rounded-lg border'>
                <div className='flex items-center gap-4'>
                  <Avatar>
                    <AvatarImage src={member.user.avatar} />
                    <AvatarFallback>
                      {member.user.firstName.charAt(0)}
                      {member.user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>
                      {member.user.firstName} {member.user.lastName}
                    </p>
                    <div className='flex items-center gap-2 mt-1'>
                      <Badge variant='outline'>{member.role.name}</Badge>
                      <p className='text-sm text-gray-500'>Joined {format(new Date(member.joinedAt), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-red-600'>Remove Member</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
            {members.length === 0 && <p className='text-center text-sm text-gray-500 py-8'>No members found</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
