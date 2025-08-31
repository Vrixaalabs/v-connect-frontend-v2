import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MotionCard } from '@/components/ui/motion-card';
import { Building2, Users, School, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Institute } from '@/types/institute';

const SuperAdminInstitutesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
  });

  // TODO: Replace with actual API call
  const institutes: Institute[] = [];

  const handleCreateInstitute = async () => {
    // TODO: Implement institute creation
    setIsCreateModalOpen(false);
  };

  const handleDeleteInstitute = async (instituteToDelete: Institute) => {
    // TODO: Implement institute deletion
    console.log('Deleting institute:', instituteToDelete.id);
  };

  const stats = [
    {
      title: 'Total Institutes',
      value: institutes.length,
      icon: Building2,
      color: 'text-blue-500',
    },
    {
      title: 'Total Students',
      value: institutes.reduce((acc, inst) => acc + inst.studentsCount, 0),
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Total Departments',
      value: institutes.reduce((acc, inst) => acc + inst.departments.length, 0),
      icon: School,
      color: 'text-purple-500',
    },
    {
      title: 'Locations',
      value: new Set(institutes.map(inst => inst.location)).size,
      icon: MapPin,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <MotionCard
            key={stat.title}
            delay={index * 0.1}
            className="bg-card"
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-full bg-muted", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search institutes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create New Institute
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {institutes.map((institute, index) => (
            <MotionCard
              key={institute.id}
              delay={index * 0.1}
              className="relative group"
              header={
                <div className="flex items-center gap-4">
                  {institute.logo && (
                    <img
                      src={institute.logo}
                      alt={institute.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{institute.name}</h3>
                    <p className="text-sm text-muted-foreground">{institute.location}</p>
                  </div>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{institute.studentsCount} Students</span>
                    <span>{institute.departments.length} Departments</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInstitute(institute)}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteInstitute(institute)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              }
            >
              <p className="text-sm text-muted-foreground line-clamp-2">
                {institute.description}
              </p>
            </MotionCard>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Create Institute Modal */}
      <Dialog
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Create New Institute</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Institute Name</Label>
              <Input
                value={newInstitute.name}
                onChange={(e) => setNewInstitute({ ...newInstitute, name: e.target.value })}
                placeholder="Enter institute name"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={newInstitute.description}
                onChange={(e) => setNewInstitute({ ...newInstitute, description: e.target.value })}
                placeholder="Enter institute description"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={newInstitute.location}
                onChange={(e) => setNewInstitute({ ...newInstitute, location: e.target.value })}
                placeholder="Enter institute location"
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                value={newInstitute.website}
                onChange={(e) => setNewInstitute({ ...newInstitute, website: e.target.value })}
                placeholder="Enter institute website"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateInstitute}>
                Create Institute
              </Button>
            </div>
          </div>
        </motion.div>
      </Dialog>

      {/* View Institute Modal */}
      <Dialog
        open={!!selectedInstitute}
        onOpenChange={() => setSelectedInstitute(null)}
      >
        {selectedInstitute && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              {selectedInstitute.logo && (
                <img
                  src={selectedInstitute.logo}
                  alt={selectedInstitute.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">{selectedInstitute.name}</h2>
                <p className="text-muted-foreground">{selectedInstitute.location}</p>
              </div>
            </div>

            {selectedInstitute.coverImage && (
              <img
                src={selectedInstitute.coverImage}
                alt={selectedInstitute.name}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
            )}

            <div className="space-y-4">
              <div>
                <label className="font-semibold">Description:</label>
                <p className="text-muted-foreground">{selectedInstitute.description}</p>
              </div>

              <div>
                <label className="font-semibold">Website:</label>
                <a
                  href={selectedInstitute.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-2"
                >
                  {selectedInstitute.website}
                </a>
              </div>

              <div>
                <label className="font-semibold">Departments:</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedInstitute.departments.map((dept) => (
                    <div
                      key={dept.id}
                      className="p-2 bg-muted rounded-md text-sm"
                    >
                      {dept.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold">{selectedInstitute.studentsCount}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="text-2xl font-bold">{selectedInstitute.followersCount}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Dialog>
    </div>
  );
};

export default SuperAdminInstitutesPage;