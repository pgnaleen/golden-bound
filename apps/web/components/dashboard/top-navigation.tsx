"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  BarChart3,
  Settings,
  Users,
  FileText,
  LogOut,
  Menu,
  ChevronDown,
  User,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export function TopNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  const navigation = [
    {
      name: t("dashboard"),
      href: "/dashboard",
      icon: Home,
      current: true,
    },
    {
      name: t("analytics"),
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: false,
    },
    {
      name: t("users"),
      icon: Users,
      current: false,
      subItems: [
        { name: "All Users", href: "/dashboard/users" },
        { name: "User Roles", href: "/dashboard/users/roles" },
        { name: "Permissions", href: "/dashboard/users/permissions" },
      ],
    },
    {
      name: t("reports"),
      icon: FileText,
      current: false,
      subItems: [
        { name: "Analytics Reports", href: "/dashboard/reports/analytics" },
        { name: "User Reports", href: "/dashboard/reports/users" },
        { name: "System Reports", href: "/dashboard/reports/system" },
      ],
    },
    {
      name: t("settings"),
      icon: Settings,
      current: false,
      subItems: [
        { name: t("profile"), href: "/dashboard/settings/profile", icon: User },
        {
          name: t("security"),
          href: "/dashboard/settings/security",
          icon: Shield,
        },
        {
          name: t("notifications"),
          href: "/dashboard/settings/notifications",
          icon: Bell,
        },
        {
          name: t("billing"),
          href: "/dashboard/settings/billing",
          icon: CreditCard,
        },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || "U";
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center h-16 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Logo */}
          <div
            className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  PA
                </span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-foreground">
                Professional Auth
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              if (item.subItems) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isRTL ? "start" : "end"}>
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <DropdownMenuItem key={subItem.name} asChild>
                            <Link
                              href={subItem.href}
                              className={`gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              {SubIcon && <SubIcon className="h-4 w-4" />}
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Button key={item.name} variant="ghost" asChild>
                  <Link
                    href={item.href}
                    className={`gap-2 ${isRTL ? "flex-row-reverse" : ""} ${
                      item.current ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Right side - Language switcher and User menu */}
          <div
            className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <LanguageSwitcher />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`hidden sm:block ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <p className="text-sm font-medium">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.username}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isRTL ? "start" : "end"}
                className="w-56"
              >
                <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger
                    className={isRTL ? "flex-row-reverse" : ""}
                  >
                    <Settings
                      className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                    />
                    {t("settings")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      className={isRTL ? "flex-row-reverse" : ""}
                    >
                      <User className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {t("profile")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={isRTL ? "flex-row-reverse" : ""}
                    >
                      <Shield
                        className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      {t("security")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={isRTL ? "flex-row-reverse" : ""}
                    >
                      <Bell className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {t("notifications")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={isRTL ? "flex-row-reverse" : ""}
                    >
                      <CreditCard
                        className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      {t("billing")}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem className={isRTL ? "flex-row-reverse" : ""}>
                  <HelpCircle
                    className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                  />
                  {t("support")}
                </DropdownMenuItem>

                <DropdownMenuItem className={isRTL ? "flex-row-reverse" : ""}>
                  <BookOpen className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("documentation")}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className={`text-destructive ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;

                if (item.subItems) {
                  return (
                    <div key={item.name} className="space-y-1">
                      <div
                        className={`flex items-center px-3 py-2 text-sm font-medium text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <Icon
                          className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                        />
                        {item.name}
                      </div>
                      <div className={`${isRTL ? "pr-6" : "pl-6"} space-y-1`}>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    } ${isRTL ? "flex-row-reverse" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
