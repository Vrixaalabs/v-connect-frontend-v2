'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCard } from '@/components/auth/AuthCard';
import { UserTypeSelector } from '@/components/auth/UserTypeSelector';

export default function ForgotPasswordPage() {
  const [userType, setUserType] = useState<'student' | 'institute' | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            Reset Your Password
          </motion.h1>
          <UserTypeSelector onSelect={setUserType} />
        </div>
      </div>
    );
  }

  if (emailSent) {
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
            <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;e sent password reset instructions to your email address.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">
                Return to Login
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
          <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setEmailSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={userType === 'student' ? "student@example.com" : "institute@example.com"}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="link"
              className="px-0 text-sm"
              onClick={() => setUserType(null)}
            >
              Change account type
            </Button>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Send Reset Instructions
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