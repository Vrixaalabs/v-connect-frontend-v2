import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { MotionCard } from '@/components/ui/motion-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Shield, Calendar, Building2 } from 'lucide-react';
import type { InstituteAdmin, Institute } from '@/types/institute';

const SuperAdminAdminsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<InstituteAdmin | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    instituteId: '',
  });

  // TODO: Replace with actual API calls
  const admins: InstituteAdmin[] = [];
  const institutes: Institute[] = [];

  const handleAssignAdmin = async () => {
    // TODO: Implement admin assignment
    setIsAssignModalOpen(false);
  };

  const handleRemoveAdmin = async (adminToRemove: InstituteAdmin) => {
    // TODO: Implement admin removal
    console.log('Removing admin:', adminToRemove.id);
  };

  const stats = [
    {
      title: 'Total Admins',
      value: admins.length,
      icon: Shield,
      color: 'text-blue-500',
    },
    {
      title: 'Institutes Managed',
      value: new Set(admins.map(admin => admin.instituteId)).size,
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
          {admins.map((admin, index) => (
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
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Permissions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {admin.role.permissions.map((permission) => (
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
                {institutes.map((institute) => (
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
              <Button onClick={handleAssignAdmin}>
                Assign Admin
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