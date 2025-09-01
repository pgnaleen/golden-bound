"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { TopNavigation } from "@/components/dashboard/top-navigation";
import { UserProfile } from "@/components/dashboard/user-profile";

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <TopNavigation />
      <main className="pt-16">
        <div className="p-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground text-balance">
              {t("welcome")}, {user.firstName || user.username}!
            </h1>
            <p className="text-muted-foreground text-pretty">
              {t("dashboardSubtitle")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <UserProfile />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
