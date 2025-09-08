import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
import type { CreateEntityInput, Entity, EntityType } from '@/types/entity';

const entitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['DEPARTMENT', 'COMMITTEE', 'TEAM', 'OTHER'] as const),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional(),
  parentEntityId: z.string().optional().nullable(),
});

interface EntityFormProps {
  onSubmit: (data: CreateEntityInput) => Promise<void>;
  initialData?: Entity;
  existingEntities?: Entity[];
  isLoading?: boolean;
}

export default function EntityForm({
  onSubmit,
  initialData,
  existingEntities = [],
  isLoading = false,
}: EntityFormProps) {
  const form = useForm<CreateEntityInput>({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type || 'DEPARTMENT',
      code: initialData?.code || '',
      description: initialData?.description || '',
      parentEntityId: initialData?.parentEntityId || null,
    },
  });

  const entityTypes: EntityType[] = ['DEPARTMENT', 'COMMITTEE', 'TEAM', 'OTHER'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter entity name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {entityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter entity code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* <Textarea
                  placeholder="Enter entity description"
                  className="resize-none"
                  {...field}
                /> */}
                <Input
                  placeholder="Enter entity description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parentEntityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Entity (Optional)</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent entity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {existingEntities.map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Entity' : 'Create Entity'}
        </Button>
      </form>
    </Form>
  );
}
