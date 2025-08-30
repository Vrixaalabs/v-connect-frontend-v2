import { useState } from "react"
import { mockClubs } from "../../../data/mock-clubs"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Badge } from "../../../components/ui/badge"
import { format } from "date-fns"
import { Edit, MoreVertical, Plus, Trash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"

export default function AdminClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClubs = mockClubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Clubs</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage club pages, members, and content
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Club
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Club</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClubs.map((club) => (
              <TableRow key={club.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={club.logo} alt={club.name} />
                      <AvatarFallback>{club.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{club.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {club.contact.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{club.category}</Badge>
                </TableCell>
                <TableCell>{club.members.length}</TableCell>
                <TableCell>{club.events.length}</TableCell>
                <TableCell>
                  {format(new Date(club.established), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      club.features.enableRegistration ? "default" : "secondary"
                    }
                  >
                    {club.features.enableRegistration
                      ? "Open Registration"
                      : "Closed"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 