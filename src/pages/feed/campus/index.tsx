'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Building2, Tag, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import mockData from '../../../data/mock-campus.json';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const priorityColors = {
  high: 'destructive',
  medium: 'default',
  normal: 'secondary',
} as const;

export default function CampusUpdatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = ['all', ...new Set(mockData.updates.map(update => update.department))];

  const filteredUpdates = mockData.updates.filter((update) => {
    const matchesDepartment = selectedDepartment === 'all' || update.department === selectedDepartment;
    const matchesSearch = 
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campus updates..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {departments.map((department) => (
            <Button
              key={department}
              variant={selectedDepartment === department ? 'default' : 'outline'}
              onClick={() => setSelectedDepartment(department)}
              className="whitespace-nowrap"
            >
              {department === 'all' ? 'All Departments' : department}
            </Button>
          ))}
        </div>
      </div>

      {/* Updates Grid */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredUpdates.map((update) => (
            <motion.div
              key={update.id}
              variants={fadeInUp}
              layout
              layoutId={update.id}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={priorityColors[update.priority as keyof typeof priorityColors]}>
                      {update.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(update.date), 'PPP')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Building2 className="h-4 w-4" />
                    <span>{update.department}</span>
                  </div>
                  <CardTitle>{update.title}</CardTitle>
                  <CardDescription>{update.description}</CardDescription>
                </CardHeader>
                {update.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-6"
                  >
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </motion.div>
                )}
                <CardContent className="mt-4">
                  {update.schedule && (
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Schedule</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Start: {format(new Date(update.schedule.startDate), 'PPP p')}</p>
                        <p>End: {format(new Date(update.schedule.endDate), 'PPP p')}</p>
                      </div>
                    </div>
                  )}
                  {update.affectedAreas && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Affected Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {update.affectedAreas.map((area) => (
                          <Badge key={area} variant="outline">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {update.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredUpdates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-semibold mb-2">No Updates Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
} 