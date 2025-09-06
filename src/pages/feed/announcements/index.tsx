'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { PostCard } from '@/components/feed/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import mockData from '@/data/mock-feed.json';
import { type Post } from '@/types/feed';

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

export default function AnnouncementsPage() {
  const [posts, setPosts] = useState<Post[]>(
    mockData.posts.filter((post) => post.isAnnouncement)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Official', 'Academic', 'Events', 'General', 'Emergency'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(cat => post.tags?.includes(cat));
    return matchesSearch && matchesCategories;
  });

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
    toast.success('Post liked!');
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c${post.comments.length + 1}`,
                  author: {
                    id: 'current-user',
                    name: 'Current User',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
                  },
                  content: comment,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
    toast.success('Comment added!');
  };

  const handleShare = () => {
    toast.success('Share dialog opened!');
  };

  const handleReport = () => {
    toast.success('Report submitted!');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
            <p className="text-muted-foreground">
              Important announcements and updates from your institution.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
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
                  <SheetTitle>Announcement Filters</SheetTitle>
                  <SheetDescription>
                    Filter announcements by category.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Categories</h3>
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

                  {selectedCategories.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      onClick={() => setSelectedCategories([])}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                layout
                layoutId={post.id}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PostCard
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onReport={handleReport}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h2 className="text-2xl font-semibold mb-2">No Announcements Found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MemberLayout>
  );
} 