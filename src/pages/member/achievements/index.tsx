import React, { useState } from 'react';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Plus,
  Search,
  Trophy,
  Star,
  Calendar,
  GraduationCap,
  Briefcase,
  Building2,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';

// Achievement categories
const categories = [
  'Academic',
  'Professional',
  'Sports',
  'Cultural',
  'Leadership',
  'Research',
  'Innovation',
  'Community Service',
];

// Mock data for achievements
const mockAchievements = [
  {
    id: '1',
    type: 'academic',
    title: 'Dean\'s List',
    description: 'Achieved top academic performance for Fall 2024 semester',
    date: new Date(2024, 0, 15),
    category: 'Academic',
    issuer: 'School of Engineering',
    proof: 'certificate.pdf',
    verified: true,
  },
  {
    id: '2',
    type: 'professional',
    title: 'Software Engineering Internship',
    description: 'Completed summer internship at Google',
    date: new Date(2023, 7, 30),
    category: 'Professional',
    issuer: 'Google',
    company: 'Google',
    duration: '3 months',
    verified: true,
  },
  {
    id: '3',
    type: 'award',
    title: 'Best Research Paper',
    description: 'Won first place in the International Conference on AI',
    date: new Date(2023, 11, 10),
    category: 'Research',
    issuer: 'International AI Society',
    paperTitle: 'Novel Approaches in Machine Learning',
    verified: true,
  },
];

// Achievement types for creation
const achievementTypes = [
  {
    label: 'Academic Achievement',
    value: 'academic',
    icon: GraduationCap,
    description: 'Add academic honors, awards, or certifications',
  },
  {
    label: 'Professional Achievement',
    value: 'professional',
    icon: Briefcase,
    description: 'Add work experience, internships, or professional certifications',
  },
  {
    label: 'Award/Recognition',
    value: 'award',
    icon: Trophy,
    description: 'Add awards, medals, or other recognitions',
  },
  {
    label: 'Research Publication',
    value: 'research',
    icon: FileText,
    description: 'Add research papers, publications, or patents',
  },
];

const AchievementsPage: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('academic');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Filter achievements based on search, categories, and active tab
  const filteredAchievements = mockAchievements.filter(achievement => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(achievement.category);

    const matchesTab = activeTab === 'all' || achievement.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
            <p className="text-muted-foreground">
              Showcase your academic and professional accomplishments.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search achievements..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Achievement</DialogTitle>
                  <DialogDescription>
                    Share your accomplishments with your network.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Achievement Type Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Achievement Type</label>
                    <div className="grid grid-cols-1 gap-2">
                      {achievementTypes.map((type) => (
                        <Button
                          key={type.value}
                          variant={selectedType === type.value ? "default" : "outline"}
                          className="justify-start h-auto py-3"
                          onClick={() => setSelectedType(type.value)}
                        >
                          <type.icon className="h-4 w-4 mr-2" />
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

                  {/* Achievement Details */}
                  <div className="space-y-4">
                    <Input placeholder="Achievement Title" />
                    <Textarea
                      placeholder="Describe your achievement..."
                      className="min-h-[100px]"
                    />
                    <Input type="date" placeholder="Date Achieved" />
                    <Input placeholder="Issuing Organization" />

                    {/* Type-specific fields */}
                    {selectedType === 'professional' && (
                      <>
                        <Input placeholder="Company Name" />
                        <Input placeholder="Duration" />
                      </>
                    )}
                    {selectedType === 'research' && (
                      <Input placeholder="Publication/Paper Title" />
                    )}

                    {/* Categories */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge
                            key={category}
                            variant={
                              selectedCategories.includes(category)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer hover:bg-primary/90 transition-colors"
                            onClick={() => toggleCategory(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Proof Upload */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload Certificate
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Achievement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs and Content */}
        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="award">Awards</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Achievement Cards */}
            {filteredAchievements.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No Achievements Found</h2>
                <p className="text-muted-foreground">
                  {searchQuery || selectedCategories.length > 0
                    ? "Try adjusting your search or filter criteria"
                    : "Start by adding your first achievement"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAchievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {achievement.type === 'academic' && <GraduationCap className="h-4 w-4" />}
                          {achievement.type === 'professional' && <Briefcase className="h-4 w-4" />}
                          {achievement.type === 'award' && <Trophy className="h-4 w-4" />}
                          {achievement.type === 'research' && <FileText className="h-4 w-4" />}
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        </div>
                        {achievement.verified && (
                          <Badge variant="secondary">
                            <Star className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {achievement.issuer}
                        <span className="mx-2">•</span>
                        {achievement.date.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {achievement.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{achievement.category}</Badge>
                        {achievement.company && (
                          <Badge variant="outline">
                            <Building2 className="h-3 w-3 mr-1" />
                            {achievement.company}
                          </Badge>
                        )}
                        {achievement.duration && (
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {achievement.duration}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents will automatically filter based on type */}
          <TabsContent value="academic" className="space-y-4">
            {/* Content automatically filtered by activeTab state */}
          </TabsContent>
          <TabsContent value="professional" className="space-y-4">
            {/* Content automatically filtered by activeTab state */}
          </TabsContent>
          <TabsContent value="award" className="space-y-4">
            {/* Content automatically filtered by activeTab state */}
          </TabsContent>
          <TabsContent value="research" className="space-y-4">
            {/* Content automatically filtered by activeTab state */}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default AchievementsPage;