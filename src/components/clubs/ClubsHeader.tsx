import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function ClubsHeader() {
  const [sortBy, setSortBy] = useState("newest")
  const [membershipFilter, setMembershipFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clubs & Societies</h1>
        <p className="text-muted-foreground mt-2">
          Discover and join clubs that match your interests
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clubs by name, category, or description..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Clubs</SheetTitle>
                <SheetDescription>
                  Refine your club search with additional filters
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-4">
                  <Label>Sort By</Label>
                  <RadioGroup value={sortBy} onValueChange={setSortBy}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newest" id="newest" />
                      <Label htmlFor="newest">Newest First</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oldest" id="oldest" />
                      <Label htmlFor="oldest">Oldest First</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="members" id="members" />
                      <Label htmlFor="members">Most Members</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="events" id="events" />
                      <Label htmlFor="events">Most Events</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Membership Status</Label>
                  <RadioGroup value={membershipFilter} onValueChange={setMembershipFilter}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Clubs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open">Open for Registration</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="closed" id="closed" />
                      <Label htmlFor="closed">Closed Registration</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="events" className="rounded" />
                      <Label htmlFor="events">Has Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="gallery" className="rounded" />
                      <Label htmlFor="gallery">Has Gallery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="achievements" className="rounded" />
                      <Label htmlFor="achievements">Has Achievements</Label>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
} 