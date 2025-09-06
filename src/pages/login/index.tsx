import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { AuthCard } from '../../components/auth/AuthCard';
import { UserTypeSelector } from '../../components/auth/UserTypeSelector';
import { useAuth } from '../../hooks/useAuth';
import { 
  loginSchema,
  type LoginValues,
} from '../../lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';

export default function LoginPage() {
  const [userType, setUserType] = useState<'student' | null>(null);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginValues) {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast.success('Login successful');
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Login
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
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
                control={form.control}
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
            </div>
            <div className="flex items-center justify-end">
              <Button
                variant="link"
                className="px-0 text-sm"
                asChild
              >
                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </Button>
            </div>

            <Button className="w-full" size="lg" disabled={isLoading} type="submit">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Button variant="link" className="px-0" asChild>
                <Link to={`/signup?type=${userType}`}>
                  Sign up
                </Link>
              </Button>
            </p>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
} 