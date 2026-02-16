import type { AuthTokens } from "@/types/auth"

const TOKEN_KEY = "auth_tokens"
const USER_KEY = "auth_user"

export const authStorage = {
  getTokens(): AuthTokens | null {
    if (typeof window === "undefined") return null

    try {
      const tokens = localStorage.getItem(TOKEN_KEY)
      if (!tokens) return null

      const parsed = JSON.parse(tokens)

      // Validate token structure
      if (!this.isValidTokenStructure(parsed)) {
        this.removeTokens()
        return null
      }

      return parsed
    } catch (error) {
      console.error("Failed to retrieve tokens:", error)
      this.removeTokens()
      return null
    }
  },

  setTokens(tokens: AuthTokens): void {
    if (typeof window === "undefined") return

    try {
      // Validate tokens before storing
      if (!this.isValidTokenStructure(tokens)) {
        throw new Error("Invalid token structure")
      }

      // Add timestamp for additional validation
      const tokenData = {
        ...tokens,
        storedAt: Date.now(),
      }

      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData))
    } catch (error) {
      console.error("Failed to store tokens:", error)
      throw error
    }
  },

  removeTokens(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    } catch (error) {
      console.error("Failed to remove tokens:", error)
    }
  },

  getUser() {
    if (typeof window === "undefined") return null

    try {
      const user = localStorage.getItem(USER_KEY)
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error("Failed to retrieve user:", error)
      return null
    }
  },

  setUser(user: any): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error("Failed to store user:", error)
      throw error
    }
  },

  isTokenExpired(tokens: AuthTokens): boolean {
    if (!tokens.expiresIn) return true

    const now = Date.now()
    const expirationTime = tokens.expiresIn * 1000 // Convert to milliseconds

    // Add 5 minute buffer before expiration
    return now >= expirationTime - 5 * 60 * 1000
  },

  isValidTokenStructure(tokens: any): tokens is AuthTokens {
    return (
      tokens &&
      typeof tokens.accessToken === "string" &&
      typeof tokens.refreshToken === "string" &&
      typeof tokens.expiresIn === "number" &&
      typeof tokens.tokenType === "string" &&
      tokens.accessToken.length > 0 &&
      tokens.refreshToken.length > 0
    )
  },

  isStorageAvailable(): boolean {
    if (typeof window === "undefined") return false

    try {
      const testKey = "__storage_test__"
      localStorage.setItem(testKey, "test")
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  },

  getStorageInfo(): { hasTokens: boolean; hasUser: boolean; isExpired: boolean } {
    const tokens = this.getTokens()
    const user = this.getUser()

    return {
      hasTokens: !!tokens,
      hasUser: !!user,
      isExpired: tokens ? this.isTokenExpired(tokens) : true,
    }
  },
}
