import { useQuery } from '@apollo/client';
import { GET_ENTITY_MEMBERS, GET_INVITE_BY_ENTITY_ID } from '@/graphql/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EntityMember, Entity } from '@/types/entity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InviteMemberDialog from '../dialogs/InviteMemberDialog';
import MembersList from '../lists/MembersList';
import InvitesList from '../lists/InvitesList';
import type { IInviteByEntityIdResponse, IRequest } from '@/graphql/types';
import type { IEntityMembersResponse } from '@/graphql/types';
import type { IRequestByEntityIdResponse } from '@/graphql/types';
import { GET_REQUEST_BY_ENTITY_ID } from '@/graphql/queries';
import PendingRequestsList from '../lists/PendingRequestsList';
import type { JoinRequest } from '../lists/PendingRequestsList';

interface MembersTabProps {
  entity: Entity;
  onMemberUpdate?: () => void;
}

export default function MembersTab({ entity, onMemberUpdate }: MembersTabProps) {
  const { data: membersData } = useQuery<IEntityMembersResponse>(GET_ENTITY_MEMBERS, {
    variables: {
      entityId: entity.entityId,
    },
  });

  const { data: invitesData, refetch: refetchInvites } = useQuery<IInviteByEntityIdResponse>(GET_INVITE_BY_ENTITY_ID, {
    variables: {
      entityId: entity.entityId,
    },
  });

  const { data: requestsData, refetch: refetchRequests } = useQuery<IRequestByEntityIdResponse>(GET_REQUEST_BY_ENTITY_ID, {
    variables: {
      entityId: entity.entityId,
    },
  });

  const invites = invitesData?.getInviteByEntityId?.invites || [];
  const members = membersData?.getEntityMembers?.members || [];
  const pendingInvites = invites.filter(invite => invite.status === 'pending');
  const pendingRequests = requestsData?.getRequestByEntityId?.entityRequests || [];

  const updatedPendingRequests: JoinRequest[] = pendingRequests.map((request: IRequest) => ({
    joinRequestId: request.entityRequestId,
    status: request.status,
    requestedAt: request.createdAt,
    user: {
      userId: request.userId,
      fullName: request.metadata.fullName,
      email: request.metadata.email,
      rollNumber: request.metadata.rollNumber,
      avatar: null,
      batch: request.metadata.batch,
      role: request.metadata.role,
    },
  }));

  const handleInviteUpdate = () => {
    refetchInvites();
    onMemberUpdate?.();
  };

  const handleRequestUpdate = () => {
    refetchRequests();
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
            <TabsTrigger value='members'>Members ({members.length})</TabsTrigger>
            <TabsTrigger value='invites'>Pending Invites ({pendingInvites.length})</TabsTrigger>
            {/* Pending Requests */}
            <TabsTrigger value='requests'>Pending Requests ({pendingRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value='members'>
            <MembersList members={members as EntityMember[]} />
          </TabsContent>

          <TabsContent value='invites'>
            <InvitesList invites={pendingInvites} onUpdate={handleInviteUpdate} entity={entity} />
          </TabsContent>

          <TabsContent value='requests'>
            <PendingRequestsList requests={updatedPendingRequests} onUpdate={handleRequestUpdate} entity={entity} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
