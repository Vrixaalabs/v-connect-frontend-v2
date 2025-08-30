"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  Image,
  LayoutTemplate,
  MessageSquare,
  Settings,
  Trophy,
  Users,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Overview",
    href: "/admin/clubs",
    icon: BarChart3,
  },
  {
    title: "Members",
    href: "/admin/clubs/members",
    icon: Users,
  },
  {
    title: "Events",
    href: "/admin/clubs/events",
    icon: Calendar,
  },
  {
    title: "Announcements",
    href: "/admin/clubs/announcements",
    icon: MessageSquare,
  },
  {
    title: "Achievements",
    href: "/admin/clubs/achievements",
    icon: Trophy,
  },
  {
    title: "Gallery",
    href: "/admin/clubs/gallery",
    icon: Image,
  },
  {
    title: "Templates",
    href: "/admin/clubs/templates",
    icon: LayoutTemplate,
  },
  {
    title: "Settings",
    href: "/admin/clubs/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = useLocation().pathname

  return (
    <aside className="w-64 border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Club Admin</h2>
      </div>
      <nav className="space-y-1 p-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 