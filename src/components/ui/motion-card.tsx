import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardFooter } from './card';

interface MotionCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function MotionCard({
  children,
  delay = 0,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  header,
  footer,
  ...props
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn('overflow-hidden', className)} {...props}>
        {header && (
          <CardHeader className={headerClassName}>
            {header}
          </CardHeader>
        )}
        <CardContent className={contentClassName}>
          {children}
        </CardContent>
        {footer && (
          <CardFooter className={footerClassName}>
            {footer}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
