'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { School, User } from 'lucide-react';

interface UserTypeSelectorProps {
  onSelect: (type: 'student' | 'institute') => void;
}

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-2"
          onClick={() => onSelect('student')}
        >
          <User className="h-8 w-8" />
          <span className="text-lg font-semibold">Student</span>
          <span className="text-sm text-muted-foreground">Sign in as a student</span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-2"
          onClick={() => onSelect('institute')}
        >
          <School className="h-8 w-8" />
          <span className="text-lg font-semibold">Institute</span>
          <span className="text-sm text-muted-foreground">Sign in as an institute</span>
        </Button>
      </motion.div>
    </div>
  );
} 