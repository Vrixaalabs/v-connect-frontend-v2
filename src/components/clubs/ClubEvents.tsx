import { format } from "date-fns"
import type { Club } from "@/types/club"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin } from "lucide-react"

interface ClubEventsProps {
  events: Club["events"]
}

export function ClubEvents({ events }: ClubEventsProps) {
  if (!events.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events scheduled</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <img
                src={event.image}
                alt={event.title}
                className="object-cover rounded-t-lg"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Badge
              variant={event.status === "upcoming" ? "default" : "secondary"}
              className="mb-2"
            >
              {event.status}
            </Badge>
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {event.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {format(new Date(event.date), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {format(new Date(event.date), "h:mm a")} -{" "}
                  {format(new Date(event.endDate), "h:mm a")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            {event.status === "upcoming" && (
              <Button
                className="w-full"
                asChild
              >
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 