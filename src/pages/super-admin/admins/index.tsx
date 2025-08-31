import { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
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

  const handleRemoveAdmin = async (admin: InstituteAdmin) => {
    // TODO: Implement admin removal
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search admins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAssignModalOpen(true)}>
          Assign New Admin
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <thead>
            <tr>
              <th>Admin Email</th>
              <th>Institute</th>
              <th>Role</th>
              <th>Assigned Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.userId}</td>
                <td>{admin.instituteId}</td>
                <td>{admin.role.name}</td>
                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Assign Admin Modal */}
      <Dialog
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
      >
        <div className="p-6">
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
        </div>
      </Dialog>

      {/* View Admin Modal */}
      <Dialog
        open={!!selectedAdmin}
        onOpenChange={() => setSelectedAdmin(null)}
      >
        {selectedAdmin && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Details</h2>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Email:</label>
                <p>{selectedAdmin.userId}</p>
              </div>
              <div>
                <label className="font-semibold">Institute:</label>
                <p>{selectedAdmin.instituteId}</p>
              </div>
              <div>
                <label className="font-semibold">Role:</label>
                <p>{selectedAdmin.role.name}</p>
              </div>
              <div>
                <label className="font-semibold">Permissions:</label>
                <ul className="list-disc list-inside">
                  {selectedAdmin.role.permissions.map((permission) => (
                    <li key={permission}>{permission.split('_').join(' ')}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="font-semibold">Assigned Date:</label>
                <p>{new Date(selectedAdmin.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default SuperAdminAdminsPage;
