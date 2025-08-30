import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { AuthCard } from '../../components/auth/AuthCard';
import { UserTypeSelector } from '../../components/auth/UserTypeSelector';
import {
  studentSignupSchema,
  instituteSignupSchema,
  type StudentSignupValues,
  type InstituteSignupValues,
} from '../../lib/validations/auth';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<'student' | 'institute' | null>(
    (searchParams[0].get('type') as 'student' | 'institute' | null) || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const studentForm = useForm<StudentSignupValues>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      studentId: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const instituteForm = useForm<InstituteSignupValues>({
    resolver: zodResolver(instituteSignupSchema),
    defaultValues: {
      instituteName: '',
      instituteCode: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onStudentSubmit(data: StudentSignupValues) {
    try {
      setIsLoading(true);
      // TODO: Implement student signup
      await register(data.email, data.password, data.username, data.firstName, data.lastName);
      console.log(data);
      toast.success('Account created successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function onInstituteSubmit(data: InstituteSignupValues) {
    try {
      setIsLoading(true);
      // TODO: Implement institute signup
      console.log(data);
      toast.success('Account created successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            Create Your Account
          </motion.h1>
          <UserTypeSelector onSelect={setUserType} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard className="max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {userType === 'student' ? 'Student Registration' : 'Institute Registration'}
          </h1>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        {userType === 'student' ? (
          <Form {...studentForm}>
            <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="firstName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="lastName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={studentForm.control}
                name="username"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john_doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={studentForm.control}
                name="studentId"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2024CS001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={studentForm.control}
                name="email"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="student@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={studentForm.control}
                name="password"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={studentForm.control}
                name="confirmPassword"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setUserType(null)}
                >
                  Change account type
                </Button>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...instituteForm}>
            <form onSubmit={instituteForm.handleSubmit(onInstituteSubmit)} className="space-y-4">
              <FormField
                control={instituteForm.control}
                name="instituteName"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Institute Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., University of Technology" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={instituteForm.control}
                name="instituteCode"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Institute Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., UTECH2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={instituteForm.control}
                name="email"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="institute@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={instituteForm.control}
                name="password"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={instituteForm.control}
                name="confirmPassword"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setUserType(null)}
                >
                  Change account type
                </Button>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{' '}
          <Button variant="link" className="px-0" asChild>
            <Link to="/login">
              Sign in
            </Link>
          </Button>
        </p>
      </AuthCard>
    </div>
  );
} 