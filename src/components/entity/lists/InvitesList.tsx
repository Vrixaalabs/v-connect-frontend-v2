import { useMutation } from '@apollo/client';
import { ACCEPT_ENTITY_INVITE, REJECT_ENTITY_INVITE } from '@/graphql/mutations';
import type { IInviteWithUser } from '@/graphql/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Building2, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import type { Entity } from '@/types/entity';

interface InvitesListProps {
  invites: IInviteWithUser[];
  onUpdate?: () => void;
  entity: Entity;
}

export default function InvitesList({ invites, onUpdate, entity }: InvitesListProps) {
  const [acceptInvite, { loading: accepting }] = useMutation(ACCEPT_ENTITY_INVITE);
  const [rejectInvite, { loading: rejecting }] = useMutation(REJECT_ENTITY_INVITE);
  const toast = useToast();

  const handleAcceptInvite = async (inviteId: string) => {
    try {
      const response = await acceptInvite({
        variables: {
          input: { inviteId },
        },
      });

      if (response.data?.acceptEntityInvite?.success) {
        toast.showToast('Success', 'Invite accepted successfully');
        onUpdate?.();
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
        onUpdate?.();
      } else {
        throw new Error(response.data?.rejectEntityInvite?.message || 'Failed to reject invite');
      }
    } catch (error) {
      toast.error('Error', 'Failed to reject invite');
    }
  };

  return (
    <div className='space-y-4'>
      {invites.map((invite) => (
        <Card key={invite.user.userId}>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between mb-4'>
              <Badge variant='outline'>{entity.type}</Badge>
              <Badge
                variant={
                  invite.status === 'PENDING'
                    ? 'default'
                    : invite.status === 'ACCEPTED'
                    ? 'default'
                    : 'destructive'
                }
              >
                {invite.status}
              </Badge>
            </div>

            <h3 className='text-lg font-semibold mb-2'>{invite.user.firstName} {invite.user.lastName}</h3>
            {invite.user.email && (
              <p className='text-sm text-gray-500 mb-4'>{invite.user.email}</p>
            )}

            <div className='space-y-2 mb-4'>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Building2 className='h-4 w-4' />
                <span>Code: {invite.rollNumber}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Users className='h-4 w-4' />
                <span>{invite.batch}</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Calendar className='h-4 w-4' />
                {/* <span>Expires {format(new Date(entity.expiresAt), 'PPP')}</span> */}
              </div>
            </div>

            {invite.status === 'pending' && (
              <div className='flex items-center gap-2'>
                <Button
                  className='flex-1'
                  onClick={() => handleAcceptInvite(invite.inviteId)}
                  disabled={accepting || rejecting}
                >
                  Cancel Invite
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      {invites.length === 0 && (
        <p className='text-center text-sm text-gray-500 py-8'>No pending invites found</p>
      )}
    </div>
  );
}
