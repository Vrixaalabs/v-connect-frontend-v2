import type { Club } from '../../types/club';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

interface ClubMembersProps {
  members: Club['members'];
}

export function ClubMembers({ members }: ClubMembersProps) {
  if (!members.length) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground'>No members yet</p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {members.map(member => (
        <Card key={member.id}>
          <CardContent className='p-6'>
            <div className='flex items-center gap-4'>
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-semibold'>{member.name}</h3>
                <Badge variant='outline' className='mt-1'>
                  {member.role}
                </Badge>
              </div>
            </div>
            <div className='mt-4 text-sm text-muted-foreground'>
              <p>{member.department}</p>
              <p>Year {member.year}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
