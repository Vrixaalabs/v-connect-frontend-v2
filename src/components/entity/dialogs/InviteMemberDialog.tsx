import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { INVITE_ENTITY_MEMBER } from '@/graphql/mutations';
import { useToast } from '@/hooks/useToast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface InviteMemberDialogProps {
  entityId: string;
  onSuccess?: () => void;
}

export default function InviteMemberDialog({ entityId, onSuccess }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  
  const [inviteMember, { loading }] = useMutation(INVITE_ENTITY_MEMBER, {
    onCompleted: () => {
      toast.showToast('Success', 'Invitation sent successfully');
      setOpen(false);
      onSuccess?.();
    },
    onError: () => {
      toast.showToast('Error', 'Failed to send invitation');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await inviteMember({
        variables: {
          input: {
            entityId,
            email: formData.get('email'),
            rollNumber: formData.get('rollNumber'),
            batch: formData.get('batch'),
            role: formData.get('role'),
            type: formData.get('type'),
          },
        },
      });
    } catch (error) {
      toast.error('Error', 'Failed to send invitation');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join this entity. They will receive an email with instructions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' type='email' placeholder='Enter email address' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='rollNumber'>Roll Number</Label>
            <Input id='rollNumber' name='rollNumber' placeholder='Enter roll number' required />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='batch'>Batch</Label>
              <Select name='batch' required>
                <SelectTrigger>
                  <SelectValue placeholder='Select batch' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='type'>Type</Label>
              <Select name='type' required>
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='student'>Student</SelectItem>
                  <SelectItem value='faculty'>Faculty</SelectItem>
                  <SelectItem value='alumni'>Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='role'>Role</Label>
            <Select name='role' required>
              <SelectTrigger>
                <SelectValue placeholder='Select role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='member'>Member</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
                <SelectItem value='moderator'>Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
