import React, { useState } from 'react';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Filter,
  GraduationCap,
  Building2,
  MapPin,
  Briefcase,
  MessageSquare,
  Link as LinkIcon,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for alumni
const mockAlumni = [
  {
    id: '1',
    name: 'Sarah Johnson',
    batch: '2020',
    degree: 'B.Tech',
    branch: 'Computer Science',
    company: 'Google',
    role: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    email: 'sarah.j@example.com',
    phone: '+1 234-567-8900',
    image: null,
    skills: ['React', 'Node.js', 'Cloud Computing'],
    available_for: ['Mentoring', 'Job Referrals'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    batch: '2019',
    degree: 'B.Tech',
    branch: 'Electronics',
    company: 'TechStart Inc.',
    role: 'Founder & CEO',
    location: 'New York, NY',
    email: 'michael.c@example.com',
    phone: '+1 234-567-8901',
    image: null,
    skills: ['Entrepreneurship', 'Product Management', 'IoT'],
    available_for: ['Speaking', 'Investment'],
  },
  // Add more alumni...
];

// Filter options
const batches = ['2020', '2019', '2018', '2017', '2016'];
const branches = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];
const locations = ['San Francisco, CA', 'New York, NY', 'London, UK', 'Bangalore, India'];

const AlumniDirectoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter alumni based on search and filters
  const filteredAlumni = mockAlumni.filter(alumni => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBatch = !selectedBatch || alumni.batch === selectedBatch;
    const matchesBranch = !selectedBranch || alumni.branch === selectedBranch;
    const matchesLocation = !selectedLocation || alumni.location === selectedLocation;

    return matchesSearch && matchesBatch && matchesBranch && matchesLocation;
  });

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/member/alumni">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Alumni Directory</h1>
              <p className="text-muted-foreground">
                Connect with alumni from different batches and domains
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni..."
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
                  <SheetTitle>Filter Alumni</SheetTitle>
                  <SheetDescription>
                    Refine the alumni list based on various criteria
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
                    <label className="text-sm font-medium">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
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
                      setSelectedLocation('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlumni.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Alumni Found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredAlumni.map(alumni => (
              <Card key={alumni.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-medium">{alumni.name.charAt(0)}</span>
                    </div>
                    <div>
                      <CardTitle>{alumni.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{alumni.batch}</Badge>
                        <Badge variant="outline">{alumni.branch}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{alumni.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{alumni.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{alumni.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {alumni.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Available for</div>
                    <div className="flex flex-wrap gap-2">
                      {alumni.available_for.map(item => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
    </div>
    </MemberLayout>
  );
};

export default AlumniDirectoryPage;