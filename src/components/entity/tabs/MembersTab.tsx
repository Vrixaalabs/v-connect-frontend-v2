import { useQuery } from '@apollo/client';
import { GET_ENTITY_INVITES } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EntityMember, EntityInvite } from '@/types/entity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InviteMemberDialog from '../dialogs/InviteMemberDialog';
import MembersList from '../lists/MembersList';
import InvitesList from '../lists/InvitesList';

interface MembersTabProps {
  members: EntityMember[];
  entityId: string;
  onMemberUpdate?: () => void;
}

export default function MembersTab({ members, entityId, onMemberUpdate }: MembersTabProps) {
  const { data: invitesData, refetch: refetchInvites } = useQuery(GET_ENTITY_INVITES, {
    variables: { entityId },
  });

  const invites: EntityInvite[] = invitesData?.getEntityInvites?.invites || [];
  const pendingInvites = invites.filter(invite => invite.status === 'PENDING');

  const handleInviteUpdate = () => {
    refetchInvites();
    onMemberUpdate?.();
  };

  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Members</CardTitle>
        <InviteMemberDialog entityId={entityId} onSuccess={handleInviteUpdate} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='members' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='members'>
              Members ({members.length})
            </TabsTrigger>
            <TabsTrigger value='invites'>
              Pending Invites ({pendingInvites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='members'>
            <MembersList members={members} />
          </TabsContent>

          <TabsContent value='invites'>
            <InvitesList invites={pendingInvites} onUpdate={handleInviteUpdate} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}