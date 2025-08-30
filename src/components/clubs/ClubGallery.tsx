import { format } from "date-fns"
import type { Club } from "@/types/club"
import { Card, CardContent } from "../../components/ui/card"

interface ClubGalleryProps {
  gallery: Club["gallery"]
}

export function ClubGallery({ gallery }: ClubGalleryProps) {  
  if (!gallery.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No gallery items yet</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-48">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(item.date), "MMMM d, yyyy")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 