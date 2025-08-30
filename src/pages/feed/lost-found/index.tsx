'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Search, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import mockData from '@/data/mock-lost-found.json';
import Image from 'next/image';

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

export default function LostAndFoundPage() {
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mockData.items.filter((item) => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lost & found items..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'lost' ? 'default' : 'outline'}
            onClick={() => setFilter('lost')}
          >
            Lost
          </Button>
          <Button
            variant={filter === 'found' ? 'default' : 'outline'}
            onClick={() => setFilter('found')}
          >
            Found
          </Button>
        </div>
      </div>

      {/* Items Grid */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              layout
              layoutId={item.id}
            >
              <Card className="h-full">
                {item.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </motion.div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={item.type === 'lost' ? 'destructive' : 'default'}>
                      {item.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                  <CardDescription>
                    {format(new Date(item.date), 'PPP')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.location}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    {item.contact.email}
                  </div>
                  {item.contact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      {item.contact.phone}
                    </div>
                  )}
                  {item.status === 'closed' && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <AlertCircle className="h-4 w-4" />
                      This item has been found/returned
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-semibold mb-2">No Items Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
} 