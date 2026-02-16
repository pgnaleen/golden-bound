import { BaseApiService } from "./base-api.service"
import type { User, UpdateUserProfileData } from "@/types/auth"

export class UserApiService extends BaseApiService {
  constructor() {
    super("/protected/user")
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.get<{ user: User }>("")
    return response.user
  }

  async updateProfile(data: UpdateUserProfileData): Promise<User> {
    const response = await this.put<{ user: User }>("/profile", data)
    return response.user
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return this.put<{ message: string }>("/password", {
      currentPassword,
      newPassword,
    })
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData()
    formData.append("avatar", file)

    return this.post<{ avatarUrl: string }>("/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async deleteAccount(): Promise<{ message: string }> {
    return this.delete<{ message: string }>("")
  }
}

export const userApiService = new UserApiService()
