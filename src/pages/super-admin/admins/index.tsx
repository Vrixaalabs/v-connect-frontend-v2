import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { MotionCard } from '@/components/ui/motion-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Shield, Calendar, Building2, AlertCircle } from 'lucide-react';
import type { InstituteAdmin, Institute } from '@/types/institute';
import { GET_INSTITUTE_ADMINS, SEARCH_INSTITUTES } from '@/graphql/queries';
import { ASSIGN_INSTITUTE_ADMIN, REMOVE_INSTITUTE_ADMIN } from '@/graphql/mutations';
import { useToast } from '@/hooks/useToast';
import LoadingSpinner from '@/components/LoadingSpinner';

const SuperAdminAdminsPage = () => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<InstituteAdmin | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    instituteId: '',
  });

  const { data: adminsData, loading: adminsLoading, error: adminsError } = useQuery(GET_INSTITUTE_ADMINS, {
    variables: {
      page: 1,
      limit: 10,
      search: searchQuery,
    },
    onError: (error) => {
      toast.error('Failed to load admins', error.message);
    },
  });

  const { data: institutesData, loading: institutesLoading, error: institutesError } = useQuery(SEARCH_INSTITUTES, {
    variables: {
      filter: {},
      page: 1,
      limit: 100,
    },
    onError: (error) => {
      toast.error('Failed to load institutes', error.message);
    },
  });

  const [assignAdmin, { loading: assigning }] = useMutation(ASSIGN_INSTITUTE_ADMIN, {
    onCompleted: (data) => {
      if (data.assignAdmin.success) {
        toast.success('Admin assigned successfully');
        setIsAssignModalOpen(false);
        setNewAdmin({
          email: '',
          instituteId: '',
        });
      } else {
        toast.error('Failed to assign admin', data.assignAdmin.message);
      }
    },
    onError: (error) => {
      toast.error('Failed to assign admin', error.message);
    },
    refetchQueries: ['GetInstituteAdmins'],
  });

  const [removeAdmin, { loading: removing }] = useMutation(REMOVE_INSTITUTE_ADMIN, {
    onCompleted: (data) => {
      if (data.removeAdmin.success) {
        toast.success('Admin removed successfully');
      } else {
        toast.error('Failed to remove admin', data.removeAdmin.message);
      }
    },
    onError: (error) => {
      toast.error('Failed to remove admin', error.message);
    },
    refetchQueries: ['GetInstituteAdmins'],
  });

  const handleAssignAdmin = async () => {
    await assignAdmin({
      variables: {
        input: {
          email: newAdmin.email,
          instituteId: newAdmin.instituteId,
        },
      },
    });
  };

  const handleRemoveAdmin = async (adminToRemove: InstituteAdmin) => {
    if (window.confirm(`Are you sure you want to remove ${adminToRemove.userId} as admin?`)) {
      await removeAdmin({
        variables: {
          adminId: adminToRemove.id,
        },
      });
    }
  };

  if (adminsLoading || institutesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (adminsError || institutesError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to Load Data</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
      </div>
    );
  }

  const admins = adminsData?.getInstituteAdmins.admins || [];
  const institutes = institutesData?.searchInstitutes.institutes || [];

  const stats = [
    {
      title: 'Total Admins',
      value: admins.length,
      icon: Shield,
      color: 'text-blue-500',
    },
    {
      title: 'Institutes Managed',
      value: new Set(admins.map((admin: InstituteAdmin) => admin.instituteId)).size,
      icon: Building2,
      color: 'text-green-500',
    },
    {
      title: 'Average Tenure',
      value: '6 months',
      icon: Calendar,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <MotionCard
            key={stat.title}
            delay={index * 0.1}
            className="bg-card"
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-full bg-muted", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button onClick={() => setIsAssignModalOpen(true)}>
            Assign New Admin
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {admins.map((admin: InstituteAdmin, index: number) => (
            <MotionCard
              key={admin.id}
              delay={index * 0.1}
              className="relative group"
              header={
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{admin.userId}</h3>
                    <p className="text-sm text-muted-foreground">
                      {admin.instituteId}
                    </p>
                  </div>
                  <Badge variant={admin.role.isCustom ? "secondary" : "default"}>
                    {admin.role.name}
                  </Badge>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Added {new Date(admin.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAdmin(admin)}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveAdmin(admin)}
                      disabled={removing}
                    >
                      {removing ? 'Removing...' : 'Remove'}
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Permissions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {admin.role.permissions.map((permission: string) => (
                      <Badge
                        key={permission}
                        variant="outline"
                        className="text-xs"
                      >
                        {permission.split('_').join(' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </MotionCard>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Assign Admin Modal */}
      <Dialog
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Assign New Admin</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Admin Email</Label>
              <Input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="Enter admin email"
              />
            </div>

            <div>
              <Label>Institute</Label>
              <Select
                value={newAdmin.instituteId}
                onValueChange={(value) => setNewAdmin({ ...newAdmin, instituteId: value })}
              >
                {institutes.map((institute: Institute) => (
                  <option key={institute.id} value={institute.id}>
                    {institute.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAssignAdmin}
                disabled={assigning || !newAdmin.email || !newAdmin.instituteId}
              >
                {assigning ? 'Assigning...' : 'Assign Admin'}
              </Button>
            </div>
          </div>
        </motion.div>
      </Dialog>

      {/* View Admin Modal */}
      <Dialog
        open={!!selectedAdmin}
        onOpenChange={() => setSelectedAdmin(null)}
      >
        {selectedAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Admin Details</h2>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Email:</label>
                <p className="text-muted-foreground">{selectedAdmin.userId}</p>
              </div>

              <div>
                <label className="font-semibold">Institute:</label>
                <p className="text-muted-foreground">{selectedAdmin.instituteId}</p>
              </div>

              <div>
                <label className="font-semibold">Role:</label>
                <div className="flex items-center gap-2">
                  <p>{selectedAdmin.role.name}</p>
                  <Badge variant={selectedAdmin.role.isCustom ? "secondary" : "default"}>
                    {selectedAdmin.role.isCustom ? 'Custom' : 'Default'}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="font-semibold">Permissions:</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedAdmin.role.permissions.map((permission) => (
                    <div
                      key={permission}
                      className="p-2 bg-muted rounded-md text-sm"
                    >
                      {permission.split('_').join(' ')}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold">Assigned Date:</label>
                <p className="text-muted-foreground">
                  {new Date(selectedAdmin.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </Dialog>
    </div>
  );
};

export default SuperAdminAdminsPage;