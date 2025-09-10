import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_JOIN_REQUESTS } from "@/graphql/queries";
import { ACCEPT_ENTITY_JOIN_REQUEST, REJECT_ENTITY_JOIN_REQUEST } from "@/graphql/mutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserCircle,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Mail,
  Calendar,
  Building2,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import type { Entity } from "@/types/entity";

export interface JoinRequest {
  joinRequestId: string;
  user: {
    userId: string;
    fullName: string;
    email: string;
    rollNumber: string,
    avatar: string | null;
    batch: string;
    role: string;
  };
  status: string;
  requestedAt: string;
  message?: string;
}

interface PendingRequestsListProps {
  requests: JoinRequest[];
  onUpdate: () => void;
  entity: Entity;
}

export default function PendingRequestsList({ requests, onUpdate, entity }: PendingRequestsListProps) {
  // const [requests, setRequests] = useState<JoinRequest[]>(mockRequests);


  const [acceptRequest] = useMutation(ACCEPT_ENTITY_JOIN_REQUEST);
  const [rejectRequest] = useMutation(REJECT_ENTITY_JOIN_REQUEST);

  // Handle accept request
  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest({
        variables: {
          requestId,
        },
      });
      toast.success('Request accepted successfully');
      // Update local state
      // setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      toast.error('Failed to accept request');
      console.error('Error accepting request:', error);
    }
  };

  // Handle reject request
  const handleReject = async (requestId: string) => {
    try {
      await rejectRequest({
        variables: {
          requestId,
        },
      });
      toast.success('Request rejected');
      // Update local state
      // setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      toast.error('Failed to reject request');
      console.error('Error rejecting request:', error);
    }
  };

  // if (loading) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Pending Requests</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="flex items-center justify-center py-8">
  //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Pending Requests</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="text-center py-8 text-destructive">
  //           Error loading requests
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  const displayRequests = requests;

  if (displayRequests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No pending requests
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pending Requests</CardTitle>
          <Badge variant="secondary">{displayRequests.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayRequests.map((request: JoinRequest) => (
          <div
            key={request.joinRequestId}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {request.user.avatar ? (
                    <img
                      src={request.user.avatar}
                      alt={`${request.user.fullName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">
                    {request.user.fullName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {request.user.email}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {request.user.batch}
                    </Badge>
                    <Badge variant="secondary">
                      <Building2 className="h-3 w-3 mr-1" />
                      {request.user.rollNumber}
                    </Badge>
                    {/* <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </Badge> */}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleAccept(request.joinRequestId)}>
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Accept Request
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleReject(request.joinRequestId)}
                    className="text-destructive"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Request
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {request.message && (
              <div className="bg-muted p-3 rounded-md text-sm">
                {request.message}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReject(request.joinRequestId)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                size="sm"
                onClick={() => handleAccept(request.joinRequestId)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Accept
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
