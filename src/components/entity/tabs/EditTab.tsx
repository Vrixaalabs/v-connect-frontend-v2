import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EntityForm from '@/components/entity/forms/EntityForm';
import type { CreateEntityInput } from '@/types/entity';

export default function EditTab({
  handleUpdateEntity,
  entity,
  updating,
}: {
  handleUpdateEntity: (data: CreateEntityInput) => Promise<void>;
  entity: any;
  updating: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Entity</CardTitle>
      </CardHeader>
      <CardContent>
        <EntityForm onSubmit={handleUpdateEntity} initialData={entity} isLoading={updating} />
      </CardContent>
    </Card>
  );
}
