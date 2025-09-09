import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FOLLOW_ORGANIZATION, UNFOLLOW_ORGANIZATION } from '@/graphql/mutations';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';

interface Department {
  id: string;
  name: string;
  code: string;
}

interface Address {
  city: string;
  state: string;
  country: string;
}

interface Organization {
  organizationId: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  email: string;
  phone: string;
  address: Address;
  departments: Department[];
  followers: string[];
  isVerified: boolean;
  isActive: boolean;
}

interface OrganizationDetailsModalProps {
  organization: Organization;
  onClose: () => void;
}

export function OrganizationDetailsModal({ organization, onClose }: OrganizationDetailsModalProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(organization.followers.includes(user?.userId || ''));

  const [followOrganization] = useMutation(FOLLOW_ORGANIZATION, {
    onCompleted: () => {
      setIsFollowing(true);
      // toast({
      //   title: 'Success',
      //   description: 'You are now following this institute',
      // });
      toast.success('Success', 'You are now following this organization');
    },
    onError: () => {
      toast.error('Error', 'Failed to follow organization. Please try again.');
    },
  });

  const [unfollowOrganization] = useMutation(UNFOLLOW_ORGANIZATION, {
    onCompleted: () => {
      setIsFollowing(false);
      // toast({
      //   title: 'Success',
      //   description: 'You have unfollowed this institute',
      // });
      toast.success('Success', 'You have unfollowed this organization');
    },
    onError: () => {
      toast.error('Error', 'Failed to unfollow organization. Please try again.');
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      unfollowOrganization({
        variables: { organizationId: organization.organizationId },
      });
    } else {
      followOrganization({
        variables: { organizationId: organization.organizationId },
      });
    }
  };

  const handleJoin = () => {
    navigate(`/organization/${organization.slug}`);
    onClose();
  };

  return (
    <DialogContent className='sm:max-w-[600px]'>
      <DialogHeader>
        <DialogTitle className='flex items-center justify-between'>
          <span>{organization.name}</span>
          {organization.isVerified && <Badge variant='secondary'>Verified</Badge>}
        </DialogTitle>
      </DialogHeader>

      <div className='mt-4'>
        {organization.banner && (
          <div className='relative h-40 w-full mb-4 rounded-lg overflow-hidden'>
            <img src={organization.banner} alt={organization.name} className='w-full h-full object-cover' />
          </div>
        )}

        <p className='text-gray-600 mb-4'>{organization.description}</p>

        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold mb-2'>Contact Information</h3>
            <div className='text-sm text-gray-600'>
              <p>Email: {organization.email}</p>
              <p>Phone: {organization.phone}</p>
              <p>
                Location: {organization.address.city}, {organization.address.state}, {organization.address.country}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className='font-semibold mb-2'>Departments</h3>
            <div className='grid grid-cols-2 gap-2'>
              {organization.departments.map(dept => (
                <Badge key={dept.id} variant='outline' className='text-sm'>
                  {dept.name} ({dept.code})
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className='flex justify-end space-x-4 mt-8'>
          <Button variant='outline' onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          <Button onClick={handleJoin}>Join Organization</Button>
        </div>
      </div>
    </DialogContent>
  );
}
