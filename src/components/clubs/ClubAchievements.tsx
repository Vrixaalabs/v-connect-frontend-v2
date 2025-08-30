
import { format } from "date-fns"
import type { Club } from "@/types/club"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface ClubAchievementsProps {
  achievements: Club["achievements"]
}

export function ClubAchievements({ achievements }: ClubAchievementsProps) {
  if (!achievements.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No achievements yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold truncate">{achievement.title}</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(achievement.date), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 