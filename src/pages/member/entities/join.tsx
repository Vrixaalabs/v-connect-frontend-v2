import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Building2,
  Users,
  Search,
  Calendar,
  UserPlus,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ENTITIES } from '@/graphql/queries';
import { CREATE_ENTITY_REQUEST } from '@/graphql/mutations';
import { toast } from 'sonner';
import type { Entity } from '@/types/entity';

// Form validation schema
const joinRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  type: z.string().min(1, 'Type is required'),
  department: z.string().optional(),
  batch: z.string().min(1, 'Batch is required'),
  message: z.string().optional(),
});

type JoinRequestFormData = z.infer<typeof joinRequestSchema>;

// Mock data for entities
const mockEntities = [
  {
    id: '1',
    name: 'Computer Science Department',
    type: 'DEPARTMENT',
    code: 'CSE',
    description: 'Department of Computer Science and Engineering',
    metadata: {
      totalMembers: 150,
      totalPosts: 45,
      totalEvents: 12,
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    },
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Technical Committee',
    type: 'COMMITTEE',
    code: 'TECH',
    description: 'Committee for technical events and activities',
    metadata: {
      totalMembers: 25,
      totalPosts: 30,
      totalEvents: 8,
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    status: 'ACTIVE',
  },
  {
    id: '3',
    name: 'Research Team',
    type: 'TEAM',
    code: 'RT',
    description: 'Team focused on research and development',
    metadata: {
      totalMembers: 15,
      totalPosts: 20,
      totalEvents: 5,
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
    status: 'ACTIVE',
  },
];

// const entityTypes = [
//   { value: 'DEPARTMENT', label: 'Department' },
//   { value: 'COMMITTEE', label: 'Committee' },
//   { value: 'TEAM', label: 'Team' },
//   { value: 'OTHER', label: 'Other' },
// ];

export default function JoinEntityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, _] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Form setup
  const form = useForm<JoinRequestFormData>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      rollNumber: '',
      type: '',
      batch: '',
      department: '',
      message: '',
    },
  });

  // GraphQL query for entities
  const { data, loading, error } = useQuery(GET_ALL_ENTITIES);

  // GraphQL mutation for sending join request
  const [sendRequest, { loading: sendingRequest }] = useMutation(CREATE_ENTITY_REQUEST);

  const onSubmit = async (data: JoinRequestFormData) => {
    if (!selectedEntity) return;

    try {
      await sendRequest({
        variables: {
          input: {
            entityId: selectedEntity.entityId,
            metadata: {
              ...data,
            },
          },
        },
      });
      toast.success('Join request sent successfully');
      setIsJoinModalOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to send join request');
      console.error('Error sending join request:', error);
    }
  };

  // Filter entities based on search and type
  const filteredEntities = (data?.getAllEntities?.entities || mockEntities).filter((entity: Entity) => {
    const matchesSearch =
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !selectedType || entity.type === selectedType;

    return matchesSearch && matchesType;
  });

//   const formatTime = (date: Date) => {
//     return new Date(date).toLocaleString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//       day: '2-digit',
//       month: 'short',
//     });
//   };

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/member/entities">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Join Entities</h1>
              <p className="text-muted-foreground">
                Browse and join departments, committees, and teams
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entities..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {entityTypes.map((type: { value: string; label: string }) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredEntities.length}</div>
              <p className="text-xs text-muted-foreground">Available to join</p>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredEntities.filter((e: Entity) => e.type === 'DEPARTMENT').length}
              </div>
              <p className="text-xs text-muted-foreground">Academic departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Committees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredEntities.filter((e: Entity) => e.type === 'COMMITTEE').length}
              </div>
              <p className="text-xs text-muted-foreground">Active committees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teams</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredEntities.filter((e: Entity) => e.type === 'TEAM').length}
              </div>
              <p className="text-xs text-muted-foreground">Active teams</p>
            </CardContent>
          </Card> */}
        </div>

        {/* Entities List */}
        <div className="grid gap-4">
          {loading ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32 text-destructive">
                Error loading entities
              </CardContent>
            </Card>
          ) : filteredEntities.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-32">
                <Building2 className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No entities found</p>
              </CardContent>
            </Card>
          ) : (
            filteredEntities.map((entity: Entity) => (
              <Card key={entity.entityId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{entity.name}</CardTitle>
                      <CardDescription>{entity.description}</CardDescription>
                    </div>
                    <Dialog open={isJoinModalOpen && selectedEntity?.entityId === entity.entityId} onOpenChange={(open) => {
                      setIsJoinModalOpen(open);
                      if (!open) {
                        setSelectedEntity(null);
                        form.reset();
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedEntity(entity)}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Join Entity
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join {entity.name}</DialogTitle>
                          <DialogDescription>
                            Fill out the form below to request to join this entity
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              {...form.register('fullName')}
                              placeholder="Enter your full name"
                            />
                            {form.formState.errors.fullName && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.fullName.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              {...form.register('email')}
                              placeholder="Enter your email"
                            />
                            {form.formState.errors.email && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="rollNumber">Roll Number</Label>
                              <Input
                                id="rollNumber"
                                {...form.register('rollNumber')}
                                placeholder="Enter your roll number"
                              />
                              {form.formState.errors.rollNumber && (
                                <p className="text-sm text-destructive">
                                  {form.formState.errors.rollNumber.message}
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="batch">Batch</Label>
                              <Input
                                id="batch"
                                {...form.register('batch')}
                                placeholder="Enter your batch (e.g., 2024)"
                              />
                              {form.formState.errors.batch && (
                                <p className="text-sm text-destructive">
                                  {form.formState.errors.batch.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            {/* <Input
                              id="type"
                              {...form.register('type')}
                              placeholder="Enter your type (e.g., Student, Faculty)"
                            />
                            {form.formState.errors.type && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.type.message}
                              </p>
                            )} */}
                            <Select
                              value={form.watch('type')}
                              onValueChange={(value) => form.setValue('type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your type" />
                              </SelectTrigger>
                              <SelectContent>
                                {['Student', 'Faculty', 'Alumni'].map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {form.formState.errors.type && (
                              <p className="text-sm text-destructive">
                                {form.formState.errors.type.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                              id="message"
                              {...form.register('message')}
                              placeholder="Write a message to the entity administrators..."
                              className="min-h-[100px]"
                            />
                          </div>

                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsJoinModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              disabled={sendingRequest}
                            >
                              {sendingRequest ? 'Sending Request...' : 'Send Request'}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{entity.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{entity.metadata?.totalMembers} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{entity.metadata?.totalEvents} events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {/* Last active: {formatTime(entity.metadata?.lastActivityAt as Date)} */}
                      </span>
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
