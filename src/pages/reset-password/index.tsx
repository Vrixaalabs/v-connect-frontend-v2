import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCard } from '@/components/auth/AuthCard';

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <AuthCard>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Password Reset Complete</h2>
            <p className="text-muted-foreground mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <Button className="w-full" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSuccess(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Reset Password
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Button variant="link" className="px-0" asChild>
              <Link to="/login">
                Sign in
              </Link>
            </Button>
          </p>
        </form>
      </AuthCard>
    </div>
  );
} 