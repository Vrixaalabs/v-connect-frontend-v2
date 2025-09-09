import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToastHelpers } from '@/components/ui/toast';
import EntityForm from '@/components/entity/forms/EntityForm';
import InstituteAdminLayout from '@/components/admin/organization/OrganizationAdminLayout';
import type { Entity, CreateEntityInput } from '@/types/entity';

export default function EntityManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToastHelpers();

  // TODO: Replace with actual data from API
  const mockEntities: Entity[] = [
    {
      entityId: '1',
      name: 'Computer Science',
      type: 'DEPARTMENT',
      code: 'CSE',
      description: 'Department of Computer Science and Engineering',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE',
    },
    {
      entityId: '2',
      name: 'School of Management',
      type: 'COMMITTEE',
      code: 'SOM',
      description: 'School of Management Studies',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE',
    },
  ];

  const handleCreate = async (data: CreateEntityInput) => {
    try {
      setIsLoading(true);
      // TODO: Implement create mutation
      console.log('Creating entity:', data);

      toast.success('Success', 'Entity created successfully');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Error', 'Failed to create entity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: CreateEntityInput) => {
    try {
      setIsLoading(true);
      // TODO: Implement update mutation
      console.log('Updating entity:', { id: selectedEntity?.entityId, ...data });

      toast.success('Success', 'Entity updated successfully');
      setIsDialogOpen(false);
      setSelectedEntity(null);
    } catch (error) {
      toast.error('Error', 'Failed to update entity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (entity: Entity) => {
    try {
      setIsLoading(true);
      // TODO: Implement delete mutation
      console.log('Deleting entity:', entity.entityId);

      toast.success('Success', 'Entity deleted successfully');
    } catch (error) {
      toast.error('Error', 'Failed to delete entity');
    } finally {
      setIsLoading(false);
    }
  };

  const AddEntityButton = (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setSelectedEntity(null)}>
          <Plus className='w-4 h-4 mr-2' />
          Add Entity
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{selectedEntity ? 'Edit Entity' : 'Add New Entity'}</DialogTitle>
        </DialogHeader>
        <EntityForm
          onSubmit={selectedEntity ? handleUpdate : handleCreate}
          initialData={selectedEntity || undefined}
          existingEntities={mockEntities}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <InstituteAdminLayout
      title='Entity Management'
      description='Manage departments, schools, and other entities'
      action={AddEntityButton}
    >
      <div className='grid gap-4'>
        {mockEntities.map(entity => (
          <Card key={entity.entityId} className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold'>{entity.name}</h3>
                <p className='text-sm text-gray-500'>
                  {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)} • {entity.code}
                </p>
                {entity.description && <p className='mt-2 text-sm text-gray-600'>{entity.description}</p>}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <span className='sr-only'>Open menu</span>
                    •••
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedEntity(entity);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className='w-4 h-4 mr-2' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-red-600' onClick={() => handleDelete(entity)}>
                    <Trash2 className='w-4 h-4 mr-2' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </InstituteAdminLayout>
  );
}
