import { BaseApiService } from "./base-api.service"
import type { LoginCredentials, RegisterData, AuthResponse, RefreshTokenResponse } from "@/types/auth"

export class AuthApiService extends BaseApiService {
  constructor() {
    super("/auth")
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.post<AuthResponse>("/login", credentials)
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.post<AuthResponse>("/register", data)
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return this.post<RefreshTokenResponse>("/refresh", { refreshToken })
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.post<{ message: string }>("/forgot-password", { email })
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return this.post<{ message: string }>("/reset-password", { token, newPassword })
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    return this.post<{ message: string }>("/verify-email", { token })
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    return this.post<{ message: string }>("/resend-verification", { email })
  }

  async logout(): Promise<void> {
    return this.post<void>("/logout")
  }
}

export const authApiService = new AuthApiService()
