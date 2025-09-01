import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
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
import { useToastHelpers } from '@/components/ui/toast';
import type { InviteStudentInput } from '@/types/entity';

const inviteStudentSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  entityId: z.string().min(1, 'Please select a department/school'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  batch: z.string().min(1, 'Batch is required'),
  program: z.string().min(1, 'Program is required'),
});

const programs = [
  'B.Tech',
  'M.Tech',
  'PhD',
  'MBA',
  'BBA',
  'MCA',
  'MSc',
  'BSc',
  'Other',
];

export default function InviteStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastHelpers();

  // TODO: Replace with actual data from API
  const mockEntities = [
    { id: '1', name: 'Computer Science', type: 'department' },
    { id: '2', name: 'Electrical Engineering', type: 'department' },
    { id: '3', name: 'School of Management', type: 'school' },
  ];

  const form = useForm<InviteStudentInput>({
    resolver: zodResolver(inviteStudentSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      entityId: '',
      rollNumber: '',
      batch: new Date().getFullYear().toString(),
      program: '',
    },
  });

  const onSubmit = async (data: InviteStudentInput) => {
    try {
      setIsLoading(true);
      // TODO: Implement the invite mutation here
      console.log('Inviting student:', data);
      
      toast.success('Success', 'Student invitation sent successfully');
      form.reset();
    } catch (error) {
      toast.error('Error', 'Failed to send invitation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Invite Student</h1>
              <p className="text-gray-500">Send an invitation to a new student</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter student email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="entityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department/School</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department/school" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockEntities.map((entity) => (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rollNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter roll number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="batch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batch</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={2000}
                            max={2100}
                            placeholder="Enter batch year"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>
                              {program}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending Invitation...' : 'Send Invitation'}
                </Button>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}
