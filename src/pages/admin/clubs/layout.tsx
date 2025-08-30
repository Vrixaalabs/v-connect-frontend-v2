import { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/sidebar"

export const metadata: Metadata = {
  title: {
    default: "Club Administration",
    template: "%s | Club Admin",
  },
  description: "Manage clubs, members, events, and more",
}

export default function AdminClubsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container px-4 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
} 