'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  Star,
  Users,
  Megaphone,
  Search,
  MapPin,
  SlidersHorizontal,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const feedTabs = [
  {
    title: 'All Posts',
    href: '/feed',
    icon: TrendingUp,
  },
  {
    title: 'Announcements',
    href: '/feed/announcements',
    icon: Megaphone,
  },
  {
    title: 'Lost & Found',
    href: '/feed/lost-found',
    icon: Search,
  },
  {
    title: 'Club Events',
    href: '/feed/events',
    icon: Users,
  },
  {
    title: 'Campus Updates',
    href: '/feed/campus',
    icon: MapPin,
  },
];

const sortOptions = [
  { label: 'Latest', value: 'latest', icon: Clock },
  { label: 'Trending', value: 'trending', icon: TrendingUp },
  { label: 'Most Liked', value: 'most-liked', icon: Star },
];

const categories = [
  'Academic',
  'Sports',
  'Cultural',
  'Technical',
  'Social',
  'Others',
];

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Feed Navigation */}
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="container max-w-7xl mx-auto">
          <div className="py-4 space-y-4 md:space-y-0">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4">
              <div className="w-full md:w-auto md:flex-1 md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
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
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <nav className="flex space-x-1 min-w-max">
                {feedTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname === tab.href;
                  return (
                    <Link key={tab.href} href={tab.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative rounded-none whitespace-nowrap",
                          isActive && "text-primary font-medium"
                        )}
                      >
                        <Icon className="h-4 w-4 mr-2 shrink-0" />
                        {tab.title}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          />
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Sidebar - Quick Links */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-[5.5rem] space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    My Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Saved Posts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    My Clubs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-7">
            {children}
          </main>

          {/* Right Sidebar - Upcoming Events */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[5.5rem] space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Tech Fest 2024</p>
                    <p className="text-muted-foreground">March 15, 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Cultural Night</p>
                    <p className="text-muted-foreground">March 20, 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 