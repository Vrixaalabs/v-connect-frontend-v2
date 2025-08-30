import { Link } from "react-router-dom"
import type { Club } from "../../types/club"
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { CalendarDays, Users } from "lucide-react"

interface ClubCardProps {
  club: Club
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={club.coverImage}
            alt={club.name}
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={club.logo} alt={club.name} />
            <AvatarFallback>{club.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{club.name}</h3>
            <Badge variant="secondary">{club.category}</Badge>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {club.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{club.members.length} members</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{club.events.length} events</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link to={`/clubs/${club.slug}`}>View Club</Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 