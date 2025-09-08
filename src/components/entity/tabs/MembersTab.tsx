import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EntityMember } from "@/types/entity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";


export default function MembersTab({ members }: { members: EntityMember[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
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
  );
}
