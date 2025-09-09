import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_ENTITY_INVITES } from '@/graphql/queries';
import { ACCEPT_ENTITY_INVITE, REJECT_ENTITY_INVITE } from '@/graphql/mutations';
import { useToast } from '@/hooks/useToast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, Users, Calendar } from 'lucide-react';
import type { IInvitesResponse } from '@/graphql/types';
import MemberLayout from '@/components/layouts/MemberLayout';

export default function InvitesPage() {
  const { data, loading, error, refetch } = useQuery<IInvitesResponse>(GET_MY_ENTITY_INVITES);
  const [acceptInvite, { loading: accepting }] = useMutation(ACCEPT_ENTITY_INVITE);
  const [rejectInvite, { loading: rejecting }] = useMutation(REJECT_ENTITY_INVITE);
  const toast = useToast();

  const invites = data?.getMyEntityInvites?.invites || [];

  const handleAcceptInvite = async (inviteId: string) => {
    try {
      const response = await acceptInvite({
        variables: {
          input: { inviteId },
        },
      });

      if (response.data?.acceptEntityInvite?.success) {
        toast.showToast('Success', 'Invite accepted successfully');
        refetch();
      } else {
        throw new Error(response.data?.acceptEntityInvite?.message || 'Failed to accept invite');
      }
    } catch (error) {
      toast.error('Error', 'Failed to accept invite');
    }
  };

  const handleRejectInvite = async (inviteId: string) => {
    try {
      const response = await rejectInvite({
        variables: {
          input: { inviteId },
        },
      });

      if (response.data?.rejectEntityInvite?.success) {
        toast.showToast('Success', 'Invite rejected successfully');
        refetch();
      } else {
        throw new Error(response.data?.rejectEntityInvite?.message || 'Failed to reject invite');
      }
    } catch (error) {
      toast.error('Error', 'Failed to reject invite');
    }
  };

  if (loading) {
    return (
      <div className='container mx-auto py-6 space-y-6'>
        <Skeleton className='h-8 w-64' />
        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-[200px]' />
          <Skeleton className='h-[200px]' />
        </div>
      </div>
    );
  }

  return (
    <MemberLayout>
      <div className='container mx-auto py-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Entity Invites</h1>
          <p className='text-sm text-gray-500'>Manage your pending entity invitations</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {invites.map(invite => (
            <Card key={invite.inviteId}>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='outline'>{invite.entity.type}</Badge>
                  <Badge
                    variant={
                      invite.status === 'PENDING' ? 'default' : invite.status === 'ACCEPTED' ? 'default' : 'destructive'
                    }
                  >
                    {invite.status}
                  </Badge>
                </div>
                <CardTitle className='mt-2'>{invite.entity.name}</CardTitle>
                {invite.entity.description && <p className='text-sm text-gray-500'>{invite.entity.description}</p>}
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Building2 className='h-4 w-4' />
                    <span>Code: {invite.entity.code}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Users className='h-4 w-4' />
                    <span>{invite.entity.metadata?.totalMembers || 0} members</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Calendar className='h-4 w-4' />
                    {/* <span>Invited on {format(new Date(invite.createdAt), 'PPP')}</span> */}
                  </div>

                  {invite.status === 'pending' && (
                    <div className='flex items-center gap-2 mt-4'>
                      <Button
                        className='flex-1'
                        onClick={() => handleAcceptInvite(invite.inviteId)}
                        disabled={accepting || rejecting}
                      >
                        Accept
                      </Button>
                      <Button
                        variant='outline'
                        className='flex-1'
                        onClick={() => handleRejectInvite(invite.inviteId)}
                        disabled={accepting || rejecting}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {invites.length === 0 && (
            <Card className='col-span-full'>
              <CardContent className='text-center py-8'>
                <p className='text-sm text-gray-500'>No pending invites found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MemberLayout>
  );
}
