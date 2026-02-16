import { authApiService, userApiService, dashboardApiService } from "@/services"
import type { User, LoginCredentials, RegisterData } from "@/types/auth"

export const apiClient = {
  // Authentication methods
  auth: {
    login: (credentials: LoginCredentials) => authApiService.login(credentials),
    register: (data: RegisterData) => authApiService.register(data),
    refreshToken: (refreshToken: string) => authApiService.refreshToken(refreshToken),
    forgotPassword: (email: string) => authApiService.forgotPassword(email),
    resetPassword: (token: string, newPassword: string) => authApiService.resetPassword(token, newPassword),
    verifyEmail: (token: string) => authApiService.verifyEmail(token),
    resendVerification: (email: string) => authApiService.resendVerification(email),
    logout: () => authApiService.logout(),
  },

  // User management methods
  user: {
    getCurrentUser: () => userApiService.getCurrentUser(),
    updateProfile: (data: Partial<User>) => userApiService.updateProfile(data),
    changePassword: (currentPassword: string, newPassword: string) =>
      userApiService.changePassword(currentPassword, newPassword),
    uploadAvatar: (file: File) => userApiService.uploadAvatar(file),
    deleteAccount: () => userApiService.deleteAccount(),
  },

  // Dashboard methods
  dashboard: {
    getMetrics: () => dashboardApiService.getMetrics(),
    getRecentActivity: (limit?: number) => dashboardApiService.getRecentActivity(limit),
    getAnalytics: (period?: "day" | "week" | "month" | "year") => dashboardApiService.getAnalytics(period),
    exportData: (format?: "csv" | "json") => dashboardApiService.exportData(format),
  },

  // Legacy methods for backward compatibility (deprecated)
  /** @deprecated Use apiClient.user.getCurrentUser() instead */
  async getCurrentUser(): Promise<User> {
    return userApiService.getCurrentUser()
  },

  /** @deprecated Use apiClient.user.updateProfile() instead */
  async updateUserProfile(data: Partial<User>): Promise<User> {
    return userApiService.updateProfile(data)
  },

  /** @deprecated Use apiClient.dashboard.getMetrics() instead */
  async getDashboardMetrics() {
    return dashboardApiService.getMetrics()
  },

  /** @deprecated Use apiClient.dashboard.getRecentActivity() instead */
  async getRecentActivity() {
    return dashboardApiService.getRecentActivity()
  },
}
