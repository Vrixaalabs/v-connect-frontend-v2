import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCard } from '@/components/auth/AuthCard';
import { UserTypeSelector } from '@/components/auth/UserTypeSelector';

export default function LoginPage() {
  const [userType, setUserType] = useState<'student' | 'institute' | null>(null);

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            Choose Account Type
          </motion.h1>
          <UserTypeSelector onSelect={setUserType} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {userType === 'student' ? 'Student Login' : 'Institute Login'}
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={userType === 'student' ? "student@example.com" : "institute@example.com"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="link"
              className="px-0 text-sm"
              asChild
            >
              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </Button>
            <Button
              variant="link"
              className="px-0 text-sm"
              onClick={() => setUserType(null)}
            >
              Change account type
            </Button>
          </div>

          <Button className="w-full" size="lg">
            Sign in
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
      </AuthCard>
    </div>
  );
} 