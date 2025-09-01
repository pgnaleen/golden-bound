import { BaseApiService } from "./base-api.service"

export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
}

export interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
  user?: {
    id: string
    name: string
    avatar?: string
  }
}

export class DashboardApiService extends BaseApiService {
  constructor() {
    super("/protected/dashboard")
  }

  async getMetrics(): Promise<DashboardMetrics> {
    return this.get<DashboardMetrics>("/metrics")
  }

  async getRecentActivity(limit = 10): Promise<ActivityItem[]> {
    return this.get<ActivityItem[]>(`/activity?limit=${limit}`)
  }

  async getAnalytics(period: "day" | "week" | "month" | "year" = "month"): Promise<any> {
    return this.get(`/analytics?period=${period}`)
  }

  async exportData(format: "csv" | "json" = "csv"): Promise<Blob> {
    return this.get<Blob>(`/export?format=${format}`, {
      responseType: "blob",
    })
  }
}

export const dashboardApiService = new DashboardApiService()
