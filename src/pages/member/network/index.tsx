import React, { useState } from 'react';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Search,
  Users,
  UserPlus,
  Building2,
  GraduationCap,
  MapPin,
  MessageSquare,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  UserCircle,
} from 'lucide-react';

// Mock data for network
// User types
const userTypes = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'alumni', label: 'Alumni' },
];

const mockConnections = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer',
    company: 'Google',
    batch: '2020',
    branch: 'Computer Science',
    location: 'San Francisco, CA',
    mutualConnections: 15,
    status: 'connected',
    type: 'alumni',
    avatar: null,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Microsoft',
    batch: '2019',
    branch: 'Electronics',
    location: 'Seattle, WA',
    mutualConnections: 8,
    status: 'connected',
    type: 'faculty',
    avatar: null,
  },
];

const mockPendingRequests = [
  {
    id: '3',
    name: 'Emma Davis',
    role: 'UX Designer',
    company: 'Apple',
    batch: '2021',
    branch: 'Design',
    location: 'Cupertino, CA',
    mutualConnections: 5,
    status: 'pending',
    type: 'student',
    avatar: null,
  },
];

const mockSuggestions = [
  {
    id: '4',
    name: 'Alex Wong',
    role: 'Data Scientist',
    company: 'Amazon',
    batch: '2020',
    branch: 'Computer Science',
    location: 'New York, NY',
    mutualConnections: 12,
    status: 'suggestion',
    type: 'student',
    avatar: null,
  },
  {
    id: '5',
    name: 'Priya Patel',
    role: 'Frontend Developer',
    company: 'Netflix',
    batch: '2021',
    branch: 'Computer Science',
    location: 'Los Angeles, CA',
    mutualConnections: 7,
    status: 'suggestion',
    type: 'alumni',
    avatar: null,
  },
];

// Filter options
const batches = ['2021', '2020', '2019', '2018'];
const branches = ['Computer Science', 'Electronics', 'Design', 'Mechanical'];
const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Netflix'];

const NetworkPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter connections based on search and filters
  const filterProfiles = (profiles: typeof mockConnections) => {
    return profiles.filter(profile => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBatch = !selectedBatch || profile.batch === selectedBatch;
      const matchesBranch = !selectedBranch || profile.branch === selectedBranch;
      const matchesCompany = !selectedCompany || profile.company === selectedCompany;
      const matchesType = !selectedType || profile.type === selectedType;

      return matchesSearch && matchesBatch && matchesBranch && matchesCompany && matchesType;
    });
  };

  const filteredConnections = filterProfiles(mockConnections);
  const filteredPending = filterProfiles(mockPendingRequests);
  const filteredSuggestions = filterProfiles(mockSuggestions);

  const ConnectionCard = ({ profile }: { profile: typeof mockConnections[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold truncate">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{profile.company}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {profile.status === 'connected' ? (
                  <>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </>
                ) : profile.status === 'pending' ? (
                  <>
                    <Button variant="outline" size="sm" className="text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </>
                ) : (
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">
                <GraduationCap className="h-3 w-3 mr-1" />
                {profile.batch}
              </Badge>
              <Badge variant="secondary">
                <Building2 className="h-3 w-3 mr-1" />
                {profile.branch}
              </Badge>
              <Badge variant="outline">
                <UserCircle className="h-3 w-3 mr-1" />
                {userTypes.find(t => t.value === profile.type)?.label}
              </Badge>
              <Badge variant="secondary">
                <MapPin className="h-3 w-3 mr-1" />
                {profile.location}
              </Badge>
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {profile.mutualConnections} mutual
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Network</h1>
            <p className="text-muted-foreground">
              Connect and grow your professional network
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search network..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Network</SheetTitle>
                  <SheetDescription>
                    Refine your network view
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Batch</label>
                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Batches</SelectItem>
                        {batches.map(batch => (
                          <SelectItem key={batch} value={batch}>
                            {batch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Branch</label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Branches</SelectItem>
                        {branches.map(branch => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Companies</SelectItem>
                        {companies.map(company => (
                          <SelectItem key={company} value={company}>
                            {company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {userTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedBatch('');
                      setSelectedBranch('');
                      setSelectedCompany('');
                      setSelectedType('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connections</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">486</div>
              <p className="text-xs text-muted-foreground">Total connections</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Connection requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Connected companies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24</div>
              <p className="text-xs text-muted-foreground">New this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Network Content */}
        <Tabs defaultValue="connections" className="space-y-4">
          <TabsList>
            <TabsTrigger value="connections">
              Connections ({filteredConnections.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({filteredPending.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              Suggestions ({filteredSuggestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-4">
            {filteredConnections.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No Connections Found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredConnections.map(connection => (
                  <ConnectionCard key={connection.id} profile={connection} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filteredPending.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No Pending Requests</h2>
                <p className="text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredPending.map(request => (
                  <ConnectionCard key={request.id} profile={request} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            {filteredSuggestions.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No Suggestions Found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredSuggestions.map(suggestion => (
                  <ConnectionCard key={suggestion.id} profile={suggestion} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default NetworkPage;
