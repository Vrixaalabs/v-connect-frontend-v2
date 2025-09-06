import { useState } from 'react';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Star,
  Clock,
  Tag,
  Calendar,
  MapPin,
  Users,
  Mail,
} from 'lucide-react';

const sortOptions = [
  { label: 'Latest', value: 'latest', icon: Clock },
  { label: 'Trending', value: 'trending', icon: TrendingUp },
  { label: 'Most Liked', value: 'most-liked', icon: Star },
];

const postTypes = [
  { label: 'Regular Post', value: 'post', description: 'Share updates with your network' },
  { label: 'Announcement', value: 'announcement', description: 'Share important announcements' },
  { label: 'Club Event', value: 'event', description: 'Share club events and activities' },
  { label: 'Lost & Found', value: 'lost-found', description: 'Report lost or found items' },
  { label: 'Campus Update', value: 'campus', description: 'Share campus-related updates' },
];

const categories = [
  'Academic',
  'Sports',
  'Cultural',
  'Technical',
  'Social',
  'Others',
];

// Mock data for different post types
const mockPosts = [
  {
    id: '1',
    type: 'announcement',
    title: 'Important: Campus Library Hours Extended',
    content: 'The campus library will now be open until midnight during exam weeks.',
    author: {
      name: 'Library Admin',
      avatar: null,
      role: 'admin'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    category: 'Academic',
    priority: 'high'
  },
  {
    id: '2',
    type: 'event',
    title: 'Annual Tech Fest 2024',
    content: 'Join us for the biggest tech event of the year!',
    author: {
      name: 'Tech Club',
      avatar: null,
      role: 'club'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    category: 'Technical',
    eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    location: 'Main Auditorium',
    attendees: 120
  },
  {
    id: '3',
    type: 'lost-found',
    title: 'Found: Blue Laptop Bag',
    content: 'Found a blue laptop bag near the cafeteria.',
    author: {
      name: 'John Doe',
      avatar: null,
      role: 'student'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    category: 'Others',
    status: 'found',
    location: 'Cafeteria',
    contact: {
      email: 'john.doe@example.com'
    }
  },
  {
    id: '4',
    type: 'campus',
    title: 'New Study Area Opening',
    content: 'A new 24/7 study area is opening in Block B next week.',
                  author: {
      name: 'Campus Admin',
      avatar: null,
      role: 'admin'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
    category: 'Academic',
    affectedAreas: ['Block B', 'Study Spaces']
  },
  {
    id: '5',
    type: 'post',
    title: null,
    content: 'Great session at the photography workshop today!',
    author: {
      name: 'Photography Club',
      avatar: null,
      role: 'club'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    category: 'Cultural',
    image: 'https://picsum.photos/800/400'
  }
];

const FeedPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPostType, setSelectedPostType] = useState<string>('post');
  const [selectedPostTypes, setSelectedPostTypes] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const togglePostType = (type: string) => {
    setSelectedPostTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Filter and sort posts
  const filteredPosts = mockPosts
    .filter(post => {
      const matchesSearch = 
        (post.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPostType = selectedPostTypes.length === 0 || selectedPostTypes.includes(post.type);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);

      return matchesSearch && matchesPostType && matchesCategory;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'latest':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'trending':
          // Mock trending logic based on engagement
          const getEngagement = (post: typeof mockPosts[0]) => 
            (post.type === 'event' ? post.attendees || 0 : 0);
          return getEngagement(b) - getEngagement(a);
        default:
          return 0;
      }
    });
    return (
    <MemberLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
        <p className="text-muted-foreground">
              Stay updated with the latest posts and activities from your network.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Feed Filters</SheetTitle>
                  <SheetDescription>
                    Customize your feed by applying filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Post Types */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Post Types
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {postTypes.map((type) => (
                        <Badge
                          key={type.value}
                          variant={selectedPostTypes.includes(type.value) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/90 transition-colors"
                          onClick={() => togglePostType(type.value)}
                        >
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Sort Options */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Sort By
                    </h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <Button
                            key={option.value}
                            variant={selectedSort === option.value ? "default" : "ghost"}
                            className="w-full justify-start text-sm"
                            onClick={() => setSelectedSort(option.value)}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {option.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Categories */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/90 transition-colors"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(selectedCategories.length > 0 || selectedPostTypes.length > 0) && (
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedPostTypes([]);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogDescription>
                  Share updates, news, or announcements with your network.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Post Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Post Type</label>
                  <div className="grid grid-cols-1 gap-2">
                    {postTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant={selectedPostType === type.value ? "default" : "outline"}
                        className="justify-start h-auto py-3"
                        onClick={() => setSelectedPostType(type.value)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Post Content */}
                <Input placeholder="Post title (optional)" />
                <Textarea
                  placeholder={
                    selectedPostType === 'lost-found'
                      ? "Describe the item and where it was lost/found..."
                      : selectedPostType === 'event'
                      ? "Describe the event, time, and location..."
                      : selectedPostType === 'announcement'
                      ? "Write your announcement..."
                      : selectedPostType === 'campus'
                      ? "Share campus update details..."
                      : "What's on your mind?"
                  }
                  className="min-h-[100px]"
                />

                {/* Additional Fields Based on Type */}
                {selectedPostType === 'event' && (
                  <div className="space-y-2">
                    <Input type="datetime-local" placeholder="Event Date & Time" />
                    <Input placeholder="Event Location" />
                  </div>
                )}

                {selectedPostType === 'lost-found' && (
                  <div className="space-y-2">
                    <Input placeholder="Location" />
                    <Input placeholder="Contact Information" />
                  </div>
                )}

                {/* Media Attachments */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/90 transition-colors"
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedPostType === 'event' ? 'Create Event' :
                   selectedPostType === 'announcement' ? 'Post Announcement' :
                   selectedPostType === 'lost-found' ? 'Submit Report' :
                   selectedPostType === 'campus' ? 'Post Update' : 'Post'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        </div>

        {/* Quick Post Input */}
        <div className="rounded-lg border bg-card text-card-foreground p-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground"
              onClick={() => setIsCreatePostOpen(true)}
            >
              What's on your mind?
            </Button>
          </div>
        </div>

        {/* Feed Content */}
        <div className="grid gap-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No Posts Found</h2>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategories.length > 0 || selectedPostTypes.length > 0
                  ? "Try adjusting your search or filter criteria"
                  : "Start by creating your first post"}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {post.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {post.author.name}
                        <Badge variant="outline" className="text-xs">
                          {post.type === 'announcement' ? 'Announcement' :
                           post.type === 'event' ? 'Event' :
                           post.type === 'lost-found' ? 'Lost & Found' :
                           post.type === 'campus' ? 'Campus Update' : null}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(post.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {post.priority && (
                    <Badge variant={post.priority === 'high' ? 'destructive' : 'default'}>
                      {post.priority.toUpperCase()} PRIORITY
                    </Badge>
                  )}
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  {post.title && (
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                  )}
                  <p className="text-muted-foreground">{post.content}</p>
                </div>

                {/* Post Type Specific Content */}
                {post.type === 'event' && (
                  <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.eventDate ? new Date(post.eventDate).toLocaleString() : 'Date not set'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{post.location}</span>
                    </div>
                    {post.attendees && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{post.attendees} attendees</span>
                      </div>
                    )}
                  </div>
                )}

                {post.type === 'lost-found' && (
                  <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{post.location}</span>
                    </div>
                    {post.contact && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{post.contact.email}</span>
                      </div>
                    )}
                  </div>
                )}

                {post.type === 'campus' && post.affectedAreas && (
                  <div className="flex flex-wrap gap-2">
                    {post.affectedAreas.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Post Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                )}

                {/* Post Category */}
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">{post.category}</Badge>
                </div>
              </div>

              {/* Post Actions */}
              <div className="border-t px-6 py-3 flex justify-between items-center bg-muted/50">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm">Like</Button>
                  <Button variant="ghost" size="sm">Comment</Button>
                  <Button variant="ghost" size="sm">Share</Button>
                </div>
                {post.type === 'event' && (
                  <Button size="sm">Register</Button>
                )}
              </div>
            </div>
          )))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default FeedPage;