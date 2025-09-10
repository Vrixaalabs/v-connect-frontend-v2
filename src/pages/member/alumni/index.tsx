import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  GraduationCap,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Link as LinkIcon,
} from 'lucide-react';

// Mock data for alumni content
const mockEvents = [
  {
    id: '1',
    title: 'Annual Alumni Meet 2025',
    date: new Date(2025, 2, 15),
    location: 'Main Campus Auditorium',
    description: 'Join us for our annual alumni gathering.',
    attendees: 120,
    type: 'Networking',
  },
  {
    id: '2',
    title: 'Career Fair - Alumni Edition',
    date: new Date(2025, 3, 10),
    location: 'Virtual Event',
    description: 'Connect with fellow alumni for job opportunities.',
    attendees: 250,
    type: 'Career',
  },
];

const mockStories = [
  {
    id: '1',
    name: 'Sarah Johnson',
    batch: '2020',
    role: 'Senior Software Engineer',
    company: 'Google',
    story: 'From campus projects to leading a team at Google...',
  },
  {
    id: '2',
    name: 'Michael Chen',
    batch: '2019',
    role: 'Startup Founder',
    company: 'TechStart Inc.',
    story: 'The entrepreneurship club inspired me to start my own company...',
  },
];

const AlumniPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  console.log('Current tab:', activeTab);

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alumni Network</h1>
            <p className="text-muted-foreground">
              Connect with alumni, discover opportunities, and share success stories.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni network..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/member/alumni/directory">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Directory
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,231</div>
              <p className="text-xs text-muted-foreground">Across 20 batches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,890</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Opportunities</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-24 flex-col gap-2">
                <MessageSquare className="h-6 w-6" />
                Start Discussion
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Briefcase className="h-6 w-6" />
                Post Job
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Create Event
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Mail className="h-6 w-6" />
                Newsletter
              </Button>
            </div>

            {/* Featured Content */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Featured Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Connect with fellow alumni</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEvents.map(event => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge>{event.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {event.date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Featured Stories */}
              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>Alumni achievements and journeys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockStories.map(story => (
                    <div key={story.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">{story.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{story.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {story.role} at {story.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{story.story}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockEvents.map(event => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge>{event.type}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {event.date.toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <Button className="w-full">Register Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockStories.map(story => (
                <Card key={story.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-medium">{story.name.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle>{story.name}</CardTitle>
                        <CardDescription>
                          {story.role} at {story.company}
                        </CardDescription>
                        <Badge variant="secondary" className="mt-1">Batch {story.batch}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{story.story}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex justify-between items-center">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Briefcase className="h-4 w-4 mr-2" />
                Post New Opportunity
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon</CardTitle>
                  <CardDescription>Job opportunities will be available soon.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post First Job
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
    </div>
    </MemberLayout>
  );
};

export default AlumniPage;