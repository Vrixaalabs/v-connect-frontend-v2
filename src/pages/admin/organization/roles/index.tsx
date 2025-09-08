import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import type { InstituteRole } from '@/types/organization';

const AVAILABLE_PERMISSIONS = [
  'manage_students',
  'manage_roles',
  'manage_departments',
  'manage_announcements',
  'manage_events',
  'view_analytics',
];

const InstituteRolesPage = () => {
  const [roles, setRoles] = useState<InstituteRole[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleCreateRole = async () => {
    // TODO: Implement role creation
    setIsCreateModalOpen(false);
  };

  const handleDeleteRole = async (role: InstituteRole) => {
    // TODO: Implement role deletion
  };

  const togglePermission = (permission: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Roles & Permissions</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create New Role</Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {roles.map(role => (
          <Card key={role.id} className='p-6'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <h3 className='text-xl font-semibold'>{role.name}</h3>
                {role.description && <p className='text-gray-500 text-sm'>{role.description}</p>}
              </div>
              {role.isCustom && (
                <Button variant='destructive' size='sm' onClick={() => handleDeleteRole(role)}>
                  Delete
                </Button>
              )}
            </div>

            <div>
              <h4 className='font-semibold mb-2'>Permissions:</h4>
              <ul className='space-y-1'>
                {role.permissions.map(permission => (
                  <li key={permission} className='text-sm text-gray-600'>
                    • {permission.split('_').join(' ')}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-6'>Create New Role</h2>

          <div className='space-y-4'>
            <div>
              <label className='block font-semibold mb-1'>Role Name</label>
              <Input
                value={newRole.name}
                onChange={e => setNewRole({ ...newRole, name: e.target.value })}
                placeholder='Enter role name'
              />
            </div>

            <div>
              <label className='block font-semibold mb-1'>Description</label>
              <Input
                value={newRole.description}
                onChange={e => setNewRole({ ...newRole, description: e.target.value })}
                placeholder='Enter role description'
              />
            </div>

            <div>
              <label className='block font-semibold mb-2'>Permissions</label>
              <div className='space-y-2'>
                {AVAILABLE_PERMISSIONS.map(permission => (
                  <div key={permission} className='flex items-center gap-2'>
                    <Checkbox
                      checked={newRole.permissions.includes(permission)}
                      onCheckedChange={() => togglePermission(permission)}
                    />
                    <label>{permission.split('_').join(' ')}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-end gap-4 mt-6'>
              <Button variant='outline' onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole}>Create Role</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default InstituteRolesPage;
