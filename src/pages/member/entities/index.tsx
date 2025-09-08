import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import EntityForm from '@/components/admin/EntityForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import type { Entity } from '@/types/entity';
import { CREATE_ENTITY, DELETE_ENTITY } from '@/graphql/mutations';
import { GET_USER_ENTITIES } from '@/graphql/queries';
import { MoreVertical, Eye, Edit, Trash2, Users, Calendar, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function MemberEntitiesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { data: entitiesData, loading: entitiesLoading, refetch: refetchEntities } = useQuery(GET_USER_ENTITIES);
  const [createEntity, { loading: createLoading }] = useMutation(CREATE_ENTITY);
  const [deleteEntity] = useMutation(DELETE_ENTITY);

  const entities = entitiesData?.getUserEntities?.entities || [];
  const isLoading = entitiesLoading || createLoading;

  const handleCreateEntity = async (data: any) => {
    try {
      const response = await createEntity({
        variables: {
          input: {
            name: data.name,
            type: data.type,
            code: data.code,
            description: data.description,
            parentEntityId: data.parentEntityId === 'none' ? null : data.parentEntityId,
          },
        },
      });

      if (response.data?.createEntity?.success) {
        toast.showToast('Success', 'Entity created successfully');
        setIsCreateDialogOpen(false);
        refetchEntities();
      } else {
        throw new Error(response.data?.createEntity?.message || 'Failed to create entity');
      }
    } catch (error) {
      toast.error('Error', 'Failed to create entity');
    }
  };

  const handleViewEntity = (id: string) => {
    navigate(`/member/entities/${id}`, { state: { entityId: id } });
  };

  const handleEditEntity = (id: string) => {
    navigate(`/member/entities/${id}/edit`);
  };

  const handleManageMembers = (id: string) => {
    navigate(`/member/entities/${id}/members`);
  };

  const handleViewEvents = (id: string) => {
    navigate(`/member/entities/${id}/events`);
  };

  const handleEntitySettings = (id: string) => {
    navigate(`/member/entities/${id}/settings`);
  };

  const handleDeleteEntity = async (id: string) => {
    try {
      const response = await deleteEntity({
        variables: { id },
      });

      if (response.data?.deleteEntity?.success) {
        toast.showToast('Success', 'Entity deleted successfully');
        refetchEntities();
      } else {
        throw new Error(response.data?.deleteEntity?.message || 'Failed to delete entity');
      }
    } catch (error) {
      toast.error('Error', 'Failed to delete entity');
    }
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>My Entities</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Entity</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create New Entity</DialogTitle>
            </DialogHeader>
            <EntityForm onSubmit={handleCreateEntity} isLoading={isLoading} existingEntities={entities} />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {isLoading ? (
          <div className='col-span-full text-center py-8'>
            <p className='text-gray-500'>Loading entities...</p>
          </div>
        ) : entities.length === 0 ? (
          <div className='col-span-full text-center py-8'>
            <p className='text-gray-500'>No entities created yet.</p>
            <Button variant='link' onClick={() => setIsCreateDialogOpen(true)} className='mt-2'>
              Create your first entity
            </Button>
          </div>
        ) : (
          entities.map((entity: Entity) => (
            <Card key={entity.entityId} className='hover:shadow-lg transition-shadow'>
              <CardHeader className='flex flex-row justify-between items-start space-y-0'>
                <div>
                  <div className='flex items-center gap-2'>
                    <CardTitle>{entity.name}</CardTitle>
                    <Badge variant={entity.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {entity.status.charAt(0) + entity.status.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                  {entity.code && <CardDescription className='mt-1'>Code: {entity.code}</CardDescription>}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => handleViewEntity(entity.entityId)}
                    >
                      <Eye className='h-4 w-4' /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => handleEditEntity(entity.entityId)}
                    >
                      <Edit className='h-4 w-4' /> Edit Entity
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => handleManageMembers(entity.entityId)}
                    >
                      <Users className='h-4 w-4' /> Manage Members
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => handleViewEvents(entity.entityId)}
                    >
                      <Calendar className='h-4 w-4' /> View Events
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => handleEntitySettings(entity.entityId)}
                    >
                      <Settings className='h-4 w-4' /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='flex items-center gap-2 text-red-600'
                      onClick={() => handleDeleteEntity(entity.entityId)}
                    >
                      <Trash2 className='h-4 w-4' /> Delete Entity
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div>
                    <p className='text-sm font-medium mb-1'>Type</p>
                    <Badge variant='outline'>{entity.type?.charAt(0).toUpperCase() + entity.type?.slice(1)}</Badge>
                  </div>

                  {entity.description && (
                    <div>
                      <p className='text-sm font-medium mb-1'>Description</p>
                      <p className='text-sm text-gray-500'>{entity.description}</p>
                    </div>
                  )}

                  {entity.parentEntityId && (
                    <div>
                      <p className='text-sm font-medium mb-1'>Parent Entity</p>
                      <p className='text-sm text-gray-500'>
                        {entities.find((e: Entity) => e.entityId === entity.parentEntityId)?.name ||
                          entity.parentEntityId}
                      </p>
                    </div>
                  )}

                  <div className='flex justify-between items-center text-sm text-gray-500 pt-2'>
                    {/* <p>Created: {format(new Date(entity.createdAt), 'MMM d, yyyy')}</p> */}
                    <p>{entity.member?.role?.name || 'Owner'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
