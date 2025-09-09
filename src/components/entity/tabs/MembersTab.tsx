import { useQuery } from '@apollo/client';
import { GET_ENTITY_MEMBERS, GET_INVITE_BY_ENTITY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EntityMember, EntityInvite, Entity } from '@/types/entity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InviteMemberDialog from '../dialogs/InviteMemberDialog';
import MembersList from '../lists/MembersList';
import InvitesList from '../lists/InvitesList';
import type { IEntityMember, IInviteByEntityIdResponse, IInviteWithUser } from '@/graphql/types';
import type { IEntityMembersResponse } from '@/graphql/types';

interface MembersTabProps {
  entity: Entity;
  onMemberUpdate?: () => void;
}

export default function MembersTab({ entity, onMemberUpdate }: MembersTabProps) {
  const { data: membersData, refetch: refetchMembers } = useQuery<IEntityMembersResponse>(GET_ENTITY_MEMBERS, {
    variables: {
      entityId: entity.entityId,
    },
  });

  const { data: invitesData, refetch: refetchInvites } = useQuery<IInviteByEntityIdResponse>(GET_INVITE_BY_ENTITY_ID, {
    variables: {
      entityId: entity.entityId,
    },
  });

  const invites = invitesData?.getInviteByEntityId?.invites || [];
  const members = membersData?.getEntityMembers?.members || [];
  console.log("invites", invites);
  const pendingInvites = invites.filter(invite => invite.status === 'pending');

  const handleInviteUpdate = () => {
    refetchInvites();
    onMemberUpdate?.();
  };

  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Members</CardTitle>
        <InviteMemberDialog entityId={entity.entityId} onSuccess={handleInviteUpdate} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='members' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='members'>Members {0}</TabsTrigger>
            <TabsTrigger value='invites'>Pending Invites ({pendingInvites.length})</TabsTrigger>
          </TabsList>

          <TabsContent value='members'>
            <MembersList members={members as EntityMember[]} />
          </TabsContent>

          <TabsContent value='invites'>
            <InvitesList invites={pendingInvites as IInviteWithUser[]} onUpdate={handleInviteUpdate} entity={entity} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
