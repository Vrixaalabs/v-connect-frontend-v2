'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8', className)}
    >
      {children}
    </motion.div>
  );
}
