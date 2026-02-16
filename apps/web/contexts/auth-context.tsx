"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthTokens, LoginCredentials, AuthContextType, AuthResponse } from "@/types/auth"
import { authStorage } from "@/lib/auth-storage"
import { httpClient } from "@/lib/http-client"
import { tokenManager } from "@/lib/token-manager"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      const storedTokens = authStorage.getTokens()
      const storedUser = authStorage.getUser()

      if (storedTokens && storedUser && !authStorage.isTokenExpired(storedTokens)) {
        setTokens(storedTokens)
        setUser(storedUser)
        tokenManager.startSessionTimeout()
      } else {
        // Clear expired tokens
        authStorage.removeTokens()
      }

      setIsLoading(false)
    }

    initializeAuth()

    const handleTokenRefreshed = (event: CustomEvent) => {
      setTokens(event.detail)
    }

    const handleTokenCleared = () => {
      setTokens(null)
      setUser(null)
      tokenManager.stopSessionTimeout()
    }

    const handleSessionTimeout = () => {
      setTokens(null)
      setUser(null)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("tokenRefreshed", handleTokenRefreshed as EventListener)
      window.addEventListener("tokenCleared", handleTokenCleared)
      window.addEventListener("sessionTimeout", handleSessionTimeout)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("tokenRefreshed", handleTokenRefreshed as EventListener)
        window.removeEventListener("tokenCleared", handleTokenCleared)
        window.removeEventListener("sessionTimeout", handleSessionTimeout)
      }
    }
  }, [])

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true)

    try {
      const response: AuthResponse = await httpClient.post("/auth/login", credentials)

      tokenManager.setTokens(response.tokens)
      authStorage.setUser(response.user)

      setTokens(response.tokens)
      setUser(response.user)

      tokenManager.startSessionTimeout()
    } catch (error) {
      console.error("Login failed:", (error as Error).message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    tokenManager.clearTokens()
    tokenManager.stopSessionTimeout()
    setTokens(null)
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    tokens,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!tokens,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
