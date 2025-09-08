import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { GET_ORGANIZATION_BY_ID } from '@/graphql/queries';
import { ASSIGN_ORGANIZATION_ADMIN } from '@/graphql/mutations';
import LoadingSpinner from '@/components/LoadingSpinner';

const OrganizationDetailsPage = () => {
  const { organizationId } = useParams();
  const toast = useToast();
  const [isAssignAdminModalOpen, setIsAssignAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  // Fetch institute details
  const { data, loading, error } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { organizationId },
    onError: error => {
      toast.error('Failed to load institute details', error.message);
    },
  });

  // Assign admin mutation
  const [assignAdmin, { loading: assigning }] = useMutation(ASSIGN_ORGANIZATION_ADMIN, {
    onCompleted: data => {
      if (data.assignAdmin.success) {
        toast.success('Admin assigned successfully');
        setIsAssignAdminModalOpen(false);
        setAdminEmail('');
        setConfirmEmail('');
      } else {
        toast.error('Failed to assign admin', data.assignAdmin.message);
      }
    },
    onError: error => {
      toast.error('Failed to assign admin', error.message);
    },
    refetchQueries: ['GetOrganizationById'],
  });

  const handleAssignAdmin = async () => {
    if (!adminEmail || !confirmEmail) {
      toast.error('Validation Error', 'Please fill in all fields');
      return;
    }

    if (adminEmail !== confirmEmail) {
      toast.error('Validation Error', 'Email addresses do not match');
      return;
    }

    await assignAdmin({
      variables: {
        input: {
          email: adminEmail,
          organizationId,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.getOrganizationById?.organization) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
        <Shield className='w-12 h-12 text-red-500 mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Failed to Load Institute</h2>
        <p className='text-muted-foreground'>Please try refreshing the page</p>
      </div>
    );
  }

  const organization = data.getOrganizationById.organization;

  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      {/* Header Section */}
      <div className='flex justify-between items-start'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>{organization.name}</h1>
          <p className='text-muted-foreground'>{organization.description}</p>
        </div>
        <Button onClick={() => setIsAssignAdminModalOpen(true)} className='flex items-center gap-2'>
          <Shield className='w-4 h-4' />
          Assign Admin
        </Button>
      </div>

      {/* Institute Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Basic Info Card */}
        <Card className='p-6 space-y-4'>
          <h2 className='text-xl font-semibold mb-4'>Basic Information</h2>

          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Building2 className='w-5 h-5 text-muted-foreground' />
              <div>
                <p className='text-sm text-muted-foreground'>Institute ID</p>
                <p className='font-medium'>{organization.organizationId}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-muted-foreground' />
              <div>
                <p className='text-sm text-muted-foreground'>Email</p>
                <p className='font-medium'>{organization.email}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <Phone className='w-5 h-5 text-muted-foreground' />
              <div>
                <p className='text-sm text-muted-foreground'>Phone</p>
                <p className='font-medium'>{organization.phone}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <MapPin className='w-5 h-5 text-muted-foreground' />
              <div>
                <p className='text-sm text-muted-foreground'>Location</p>
                <p className='font-medium'>
                  {organization.address.line1}
                  {organization.address.line2 && `, ${organization.address.line2}`}
                  {`, ${organization.address.city}, ${organization.address.state}`}
                  {`, ${organization.address.country} - ${organization.address.pinCode}`}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Statistics</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-muted/30 rounded-lg p-4'>
              <p className='text-2xl font-bold'>{organization.studentsCount}</p>
              <p className='text-sm text-muted-foreground'>Students</p>
            </div>
            <div className='bg-muted/30 rounded-lg p-4'>
              <p className='text-2xl font-bold'>{organization.departmentCount}</p>
              <p className='text-sm text-muted-foreground'>Departments</p>
            </div>
            <div className='bg-muted/30 rounded-lg p-4'>
              <p className='text-2xl font-bold'>{organization.followersCount}</p>
              <p className='text-sm text-muted-foreground'>Followers</p>
            </div>
            <div className='bg-muted/30 rounded-lg p-4'>
              <p className='text-2xl font-bold'>{organization.isVerified ? 'Yes' : 'No'}</p>
              <p className='text-sm text-muted-foreground'>Verified</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Assign Admin Modal */}
      <Dialog open={isAssignAdminModalOpen} onOpenChange={setIsAssignAdminModalOpen}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className='p-6'
        >
          <div className='flex items-center gap-3 mb-8'>
            <div className='p-3 rounded-full bg-primary/10'>
              <Shield className='w-6 h-6 text-primary' />
            </div>
            <div>
              <h2 className='text-2xl font-bold'>Assign Institute Admin</h2>
              <p className='text-sm text-muted-foreground'>Assign an administrator for {organization.name}</p>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label>Admin Email *</Label>
              <Input
                type='email'
                placeholder='Enter admin email'
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
              />
              <p className='text-xs text-muted-foreground'>The user must have an account in the system</p>
            </div>

            <div className='space-y-2'>
              <Label>Confirm Email *</Label>
              <Input
                type='email'
                placeholder='Confirm admin email'
                value={confirmEmail}
                onChange={e => setConfirmEmail(e.target.value)}
              />
            </div>

            <div className='bg-muted/30 p-4 rounded-lg space-y-2'>
              <p className='text-sm font-medium'>Security Notice</p>
              <ul className='text-sm text-muted-foreground list-disc list-inside space-y-1'>
                <li>This action will grant full administrative access to the institute</li>
                <li>The assigned admin can manage departments, users, and settings</li>
                <li>This action cannot be undone without super admin intervention</li>
              </ul>
            </div>

            <div className='flex justify-end gap-4 pt-4 border-t'>
              <Button variant='outline' onClick={() => setIsAssignAdminModalOpen(false)} className='w-[100px]'>
                Cancel
              </Button>
              <Button
                onClick={handleAssignAdmin}
                disabled={assigning || !adminEmail || !confirmEmail || adminEmail !== confirmEmail}
                className='w-[140px]'
              >
                {assigning ? 'Assigning...' : 'Assign Admin'}
              </Button>
            </div>
          </div>
        </motion.div>
      </Dialog>
    </div>
  );
};

export default OrganizationDetailsPage;
