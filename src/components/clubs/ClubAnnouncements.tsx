import { format } from "date-fns"
import type { Club } from "@/types/club"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ClubAnnouncementsProps {
  announcements: Club["announcements"]
}

export function ClubAnnouncements({ announcements }: ClubAnnouncementsProps) {
  if (!announcements.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No announcements yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <Card key={announcement.id}>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar>
              <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
              <AvatarFallback>{announcement.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{announcement.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(announcement.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"}>
                  {announcement.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
            <p className="text-muted-foreground">{announcement.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 