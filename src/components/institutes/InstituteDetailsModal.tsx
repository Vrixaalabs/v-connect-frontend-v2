import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FOLLOW_INSTITUTE, UNFOLLOW_INSTITUTE } from '@/graphql/mutations';
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

interface Institute {
  instituteId: string;
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

interface InstituteDetailsModalProps {
  institute: Institute;
  onClose: () => void;
}

export function InstituteDetailsModal({ institute, onClose }: InstituteDetailsModalProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(
    institute.followers.includes(user?.userId || '')
  );

  const [followInstitute] = useMutation(FOLLOW_INSTITUTE, {
    onCompleted: () => {
      setIsFollowing(true);
      toast({
        title: 'Success',
        description: 'You are now following this institute',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to follow institute. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const [unfollowInstitute] = useMutation(UNFOLLOW_INSTITUTE, {
    onCompleted: () => {
      setIsFollowing(false);
      toast({
        title: 'Success',
        description: 'You have unfollowed this institute',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to unfollow institute. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      unfollowInstitute({
        variables: { instituteId: institute.instituteId },
      });
    } else {
      followInstitute({
        variables: { instituteId: institute.instituteId },
      });
    }
  };

  const handleJoin = () => {
    navigate(`/institute/${institute.slug}`);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <span>{institute.name}</span>
          {institute.isVerified && (
            <Badge variant="secondary">Verified</Badge>
          )}
        </DialogTitle>
      </DialogHeader>

      <div className="mt-4">
        {institute.banner && (
          <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
            <img
              src={institute.banner}
              alt={institute.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <p className="text-gray-600 mb-4">{institute.description}</p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="text-sm text-gray-600">
              <p>Email: {institute.email}</p>
              <p>Phone: {institute.phone}</p>
              <p>
                Location: {institute.address.city}, {institute.address.state},{' '}
                {institute.address.country}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Departments</h3>
            <div className="grid grid-cols-2 gap-2">
              {institute.departments.map((dept) => (
                <Badge key={dept.id} variant="outline" className="text-sm">
                  {dept.name} ({dept.code})
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          <Button onClick={handleJoin}>Join Institute</Button>
        </div>
      </div>
    </DialogContent>
  );
}
