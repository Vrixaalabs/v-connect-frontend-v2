import { mockClubs } from "../../../data/mock-clubs"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { 
  CalendarDays, 
  Globe, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Share2, 
  Trophy,
  Users 
} from "lucide-react"
import { ClubEvents } from "../../../components/clubs/ClubEvents"
import { ClubMembers } from "../../../components/clubs/ClubMembers"
import { ClubGallery } from "../../../components/clubs/ClubGallery"
import { ClubAnnouncements } from "../../../components/clubs/ClubAnnouncements"
import { ClubAchievements } from "../../../components/clubs/ClubAchievements"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { ScrollArea } from "../../../components/ui/scroll-area"


export default async function Page({ params }: { params: { slug: string } }) {
  const club = mockClubs.find((c) => c.slug === params.slug)
//   if (!club) notFound()

  return (
    <main className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={club?.coverImage}
          alt={club?.name}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
      </div>

      <div className="container px-4">
        {/* Club Info */}
        <div className="relative -mt-20 rounded-xl bg-card p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={club?.logo} alt={club?.name} />
                  <AvatarFallback>{club?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{club?.name}</h1>
                    <Badge variant="secondary">{club?.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{club?.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>Established {format(new Date(club?.established || ""), "MMMM yyyy")}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{club?.members.length}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <CalendarDays className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{club?.events.length}</div>
                  <div className="text-xs text-muted-foreground">Events</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <Trophy className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{club?.achievements.length}</div>
                  <div className="text-xs text-muted-foreground">Achievements</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <img alt="" src={club?.gallery[0].image} width={100} height={100} className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{club?.gallery.length}</div>
                  <div className="text-xs text-muted-foreground">Gallery Items</div>
                </div>
              </div>
            </div>

            {/* Actions & Contact */}
            <div className="w-full md:w-80 space-y-6">
              <div className="flex gap-2">
                <Button className="flex-1">Join Club</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Copy Link</DropdownMenuItem>
                    <DropdownMenuItem>Share on WhatsApp</DropdownMenuItem>
                    <DropdownMenuItem>Share on Instagram</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <a
                      href={`mailto:${club?.contact.email}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      <span>{club?.contact.email}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{club?.contact.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Social Links</h3>
                  <div className="flex gap-2">
                    {club?.socialLinks.website && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={club?.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {club?.socialLinks.instagram && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={club?.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {club?.socialLinks.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={club?.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <ScrollArea className="w-full">
            <Tabs defaultValue="events" className="space-y-8">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1">
                <TabsTrigger value="events" className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  Events
                </TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="mt-8">
                <ClubEvents events={club?.events || []} />
              </TabsContent>
              <TabsContent value="members" className="mt-8">
                <ClubMembers members={club?.members || []} />
              </TabsContent>
              <TabsContent value="achievements" className="mt-8">
                <ClubAchievements achievements={club?.achievements || []} />
              </TabsContent>
              <TabsContent value="gallery" className="mt-8">
                <ClubGallery gallery={club?.gallery || []} />
              </TabsContent>
              <TabsContent value="announcements" className="mt-8">
                <ClubAnnouncements announcements={club?.announcements || []} />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </div>
    </main>
  )
} 