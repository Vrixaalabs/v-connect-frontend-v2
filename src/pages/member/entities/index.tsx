import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import EntityForm from '@/components/entity/forms/EntityForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import type { Entity } from '@/types/entity';
import { CREATE_ENTITY } from '@/graphql/mutations';
import { GET_USER_ENTITIES } from '@/graphql/queries';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import MemberLayout from '@/components/layouts/MemberLayout';

export default function MemberEntitiesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { data: entitiesData, loading: entitiesLoading, refetch: refetchEntities } = useQuery(GET_USER_ENTITIES);
  const [createEntity, { loading: createLoading }] = useMutation(CREATE_ENTITY);
  // const [deleteEntity] = useMutation(DELETE_ENTITY);

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
      toast.error('Error', error as string);
    }
  };

  const handleViewEntity = (id: string) => {
    navigate(`/member/entities/${id}`, { state: { entityId: id } });
  };

  return (
    <MemberLayout>
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
                  <div className='flex items-center gap-2'>
                    {/* view details */}
                    <Button variant='outline' size='icon' onClick={() => handleViewEntity(entity.entityId)}>
                      <Eye className='w-4 h-4' />
                    </Button>
                  </div>
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
    </MemberLayout>
  );
}
