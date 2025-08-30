import { mockClubs } from "@/data/mock-clubs"
import { ClubCard } from "@/components/clubs/ClubCard"
import { ClubsHeader } from "@/components/clubs/ClubsHeader"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function ClubCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-3 p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}

export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-6 md:py-8 lg:py-12 space-y-6 md:space-y-8">
        <ClubsHeader />
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <ClubCardSkeleton key={i} />
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </Suspense>
      </div>
    </main>
  )
} 