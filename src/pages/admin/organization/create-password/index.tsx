import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import { Card } from '@/components/ui/card';

const createPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type CreatePasswordForm = z.infer<typeof createPasswordSchema>;

export default function CreatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement the create password mutation here

      toast.success('Success', 'Password created successfully');

      // Navigate to login page after successful password creation
      navigate('/admin/login');
    } catch (error) {
      toast.error('Error', 'Failed to create password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container flex items-center justify-center min-h-screen py-12'>
      <Card className='w-full max-w-md p-6'>
        <div className='space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Create Password</h1>
            <p className='text-gray-500'>Please create a password for your admin account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Enter your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Confirm your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Password'}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
