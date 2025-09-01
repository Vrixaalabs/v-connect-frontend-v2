import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MotionCard } from '@/components/ui/motion-card';
import { Building2, Users, School, MapPin, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Institute } from '@/types/institute';
import { SEARCH_INSTITUTES } from '@/graphql/queries';
import { CREATE_INSTITUTE } from '@/graphql/mutations';
import { useToast } from '@/hooks/useToast';
import LoadingSpinner from '@/components/LoadingSpinner';

const SuperAdminInstitutesPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      pinCode: ''
    },
  });

  const { data, loading, error } = useQuery(SEARCH_INSTITUTES, {
    variables: {
      filter: {
        search: searchQuery,
      },
      page: 1,
      limit: 10,
    },
    onError: (error) => {
      toast.error('Failed to load institutes', error.message);
    },
  });

  const [createInstitute, { loading: creating }] = useMutation(CREATE_INSTITUTE, {
    onCompleted: (data) => {
      if (data.createInstitute.success) {
        toast.success('Institute created successfully');
        setIsCreateModalOpen(false);
                  setNewInstitute({
            name: '',
            description: '',
            website: '',
            email: '',
            phone: '',
            address: {
              line1: '',
              line2: '',
              city: '',
              state: '',
              country: '',
              pinCode: ''
            }
          });
      } else {
        toast.error('Failed to create institute', data.createInstitute.message);
      }
    },
    onError: (error) => {
      toast.error('Failed to create institute', error.message);
    },
    refetchQueries: ['SearchInstitutes'],
  });

  const [deleteInstitute, { loading: deleting }] = useMutation(CREATE_INSTITUTE, {
    onCompleted: (data) => {
      if (data.createInstitute.success) {
        toast.success('Institute deleted successfully');
      } else {
        toast.error('Failed to delete institute', data.createInstitute.message);
      }
    },
    onError: (error) => {
      toast.error('Failed to delete institute', error.message);
    },
    refetchQueries: ['SearchInstitutes'],
  });

  const handleCreateInstitute = async () => {
    await createInstitute({
      variables: {
        input: {
          name: newInstitute.name,
          description: newInstitute.description,
          website: newInstitute.website,
          email: newInstitute.email,
          phone: newInstitute.phone,
          address: {
            line1: newInstitute.address.line1,
            line2: newInstitute.address.line2 || undefined,
            city: newInstitute.address.city,
            state: newInstitute.address.state,
            country: newInstitute.address.country,
            pinCode: newInstitute.address.pinCode
          }
        },
      },
    });
  };

  const handleDeleteInstitute = async (instituteToDelete: Institute) => {
    if (window.confirm(`Are you sure you want to delete ${instituteToDelete.name}?`)) {
      await deleteInstitute({
        variables: {
          instituteId: instituteToDelete.id,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to Load Institutes</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
      </div>
    );
  }

  const institutes = data?.searchInstitutes.institutes || [];


  const stats = [
    {
      title: 'Total Institutes',
      value: institutes.length,
      icon: Building2,
      color: 'text-blue-500',
    },
    {
      title: 'Total Students',
      // value: institutes.reduce((acc: number, inst: Institute) => acc + inst?.studentsCount, 0),
      value: 0,
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Total Departments',
      // value: institutes.reduce((acc: number, inst: Institute) => acc + inst?.departments?.length || 0, 0),
      value: 0,
      icon: School,
      color: 'text-purple-500',
    },
    {
      title: 'Locations',
      // value: new Set(institutes.map((inst: Institute) => inst?.location)).size,
      value: 0,
      icon: MapPin,
      color: 'text-orange-500',
    },
  ];

  return (
    <>
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Institutes Overview</h1>
        <p className="text-muted-foreground">Manage and monitor all educational institutes in the system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MotionCard
            key={stat.title}
            delay={index * 0.1}
            className="bg-card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 p-2">
              <div className={cn("p-4 rounded-xl bg-muted/50", stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-lg">
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search institutes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto"
          >
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
          {institutes.map((institute: Institute, index: number) => (
            <MotionCard
              key={institute.id}
              delay={index * 0.1}
              className="relative group hover:shadow-lg transition-all duration-300"
              header={
                <div className="flex items-center gap-4 p-2">
                  <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center">
                    {institute.logo ? (
                      <img
                        src={institute.logo}
                        alt={institute.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <School className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold line-clamp-1">{institute.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{institute.location}</span>
                    </div>
                  </div>
                </div>
              }
              footer={
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-3 text-center">
                      {/* <p className="text-lg font-semibold">{institute.studentsCount}</p> */}
                      <p className="text-lg font-semibold">0</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 text-center">
                      {/* <p className="text-lg font-semibold">{institute.departments.length}</p> */}
                      <p className="text-lg font-semibold">0</p>
                      <p className="text-xs text-muted-foreground">Departments</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/super-admin/institutes/${institute.instituteId}`)}
                      className="w-24"
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteInstitute(institute)}
                      disabled={deleting}
                      className="w-24"
                    >
                      {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="p-2">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                  {institute.description}
                </p>
              </div>
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
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-primary/10">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Create New Institute</h2>
                <p className="text-sm text-muted-foreground">Add a new educational institute to the system</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institute Name *</Label>
                  <Input
                    value={newInstitute.name}
                    onChange={(e) => setNewInstitute({ ...newInstitute, name: e.target.value })}
                    placeholder="Enter institute name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={newInstitute.email}
                    onChange={(e) => setNewInstitute({ ...newInstitute, email: e.target.value })}
                    placeholder="institute@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Input
                  value={newInstitute.description}
                  onChange={(e) => setNewInstitute({ ...newInstitute, description: e.target.value })}
                  placeholder="Enter institute description"
                />
                <p className="text-xs text-muted-foreground">
                  Provide a brief description of the institute and its key features
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={newInstitute.website}
                    onChange={(e) => setNewInstitute({ ...newInstitute, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input
                    value={newInstitute.phone}
                    onChange={(e) => setNewInstitute({ ...newInstitute, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Address Details *</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Address Line 1 *</Label>
                    <Input
                      value={newInstitute.address.line1}
                      onChange={(e) => setNewInstitute({
                        ...newInstitute,
                        address: { ...newInstitute.address, line1: e.target.value }
                      })}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Address Line 2</Label>
                    <Input
                      value={newInstitute.address.line2}
                      onChange={(e) => setNewInstitute({
                        ...newInstitute,
                        address: { ...newInstitute.address, line2: e.target.value }
                      })}
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Input
                        value={newInstitute.address.city}
                        onChange={(e) => setNewInstitute({
                          ...newInstitute,
                          address: { ...newInstitute.address, city: e.target.value }
                        })}
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>State *</Label>
                      <Input
                        value={newInstitute.address.state}
                        onChange={(e) => setNewInstitute({
                          ...newInstitute,
                          address: { ...newInstitute.address, state: e.target.value }
                        })}
                        placeholder="Enter state"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Country *</Label>
                      <Input
                        value={newInstitute.address.country}
                        onChange={(e) => setNewInstitute({
                          ...newInstitute,
                          address: { ...newInstitute.address, country: e.target.value }
                        })}
                        placeholder="Enter country"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>PIN Code *</Label>
                      <Input
                        value={newInstitute.address.pinCode}
                        onChange={(e) => setNewInstitute({
                          ...newInstitute,
                          address: { ...newInstitute.address, pinCode: e.target.value }
                        })}
                        placeholder="Enter PIN code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-[100px]"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateInstitute}
                  disabled={
                    creating || 
                    !newInstitute.name || 
                    !newInstitute.description || 
                    !newInstitute.email ||
                    !newInstitute.phone ||
                    !newInstitute.address.line1 ||
                    !newInstitute.address.city ||
                    !newInstitute.address.state ||
                    !newInstitute.address.country ||
                    !newInstitute.address.pinCode
                  }
                  className="w-[140px]"
                >
                  {creating ? 'Creating...' : 'Create Institute'}
                </Button>
              </div>
            </div>
          </motion.div>
      </Dialog>

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
    </>
  );
};

export default SuperAdminInstitutesPage;