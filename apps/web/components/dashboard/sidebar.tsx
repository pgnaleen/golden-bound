"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, BarChart3, Settings, Users, FileText, LogOut, Menu, X, ChevronDown } from "lucide-react"

export function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t, isRTL } = useLanguage()
  const router = useRouter()

  const navigation = [
    { name: t.dashboard, href: "/dashboard", icon: Home, current: true },
    { name: t.analytics, href: "/dashboard/analytics", icon: BarChart3, current: false },
    { name: "Users", href: "/dashboard/users", icon: Users, current: false },
    { name: "Reports", href: "/dashboard/reports", icon: FileText, current: false },
    { name: t.settings, href: "/dashboard/settings", icon: Settings, current: false },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    return user?.username?.[0]?.toUpperCase() || "U"
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className={`lg:hidden fixed top-4 z-50 ${isRTL ? "right-4" : "left-4"}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-40 w-64 bg-sidebar border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isRTL
            ? `right-0 border-l ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`
            : `left-0 border-r ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`flex items-center justify-center h-16 px-6 border-b border-sidebar-border ${isRTL ? "text-right" : "text-left"}`}
          >
            <h2 className="text-xl font-bold text-sidebar-foreground">Professional Auth</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${isRTL ? "flex-row-reverse" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Language switcher and User menu */}
          <div className="p-4 space-y-3 border-t border-sidebar-border">
            <div className={`flex ${isRTL ? "justify-start" : "justify-end"}`}>
              <LanguageSwitcher />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start p-3 h-auto hover:bg-sidebar-accent rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-8 w-8 ${isRTL ? "ml-3" : "mr-3"}`}>
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <p className="text-sm font-medium text-sidebar-foreground">
                      {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70">{user?.email}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-sidebar-foreground/70 ${isRTL ? "mr-auto" : "ml-auto"}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={isRTL ? "flex-row-reverse" : ""}>
                  <Settings className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.settings}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className={`text-destructive ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
