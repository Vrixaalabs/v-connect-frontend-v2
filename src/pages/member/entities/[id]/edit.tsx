import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ENTITY_BY_ID } from '@/graphql/queries';
import { UPDATE_ENTITY } from '@/graphql/mutations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/useToast';
import EntityForm from '@/components/admin/EntityForm';

export default function EditEntityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, loading } = useQuery(GET_ENTITY_BY_ID, {
    variables: { id },
  });

  const [updateEntity, { loading: updating }] = useMutation(UPDATE_ENTITY);

  const entity = data?.getEntityById?.entity;

  const handleUpdateEntity = async (formData: any) => {
    try {
      const response = await updateEntity({
        variables: {
          id,
          input: {
            name: formData.name,
            type: formData.type,
            code: formData.code,
            description: formData.description,
            parentEntityId: formData.parentEntityId === 'none' ? null : formData.parentEntityId,
          },
        },
      });

      if (response.data?.updateEntity?.success) {
        toast.showToast('Success', 'Entity updated successfully');
        navigate(`/member/entities/${id}`);
      } else {
        throw new Error(response.data?.updateEntity?.message || 'Failed to update entity');
      }
    } catch (error) {
      toast.error('Error', 'Failed to update entity');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold">Entity not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Entity</CardTitle>
        </CardHeader>
        <CardContent>
          <EntityForm
            onSubmit={handleUpdateEntity}
            initialData={entity}
            isLoading={updating}
          />
        </CardContent>
      </Card>
    </div>
  );
}
