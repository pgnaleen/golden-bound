"use client"

import { useEffect, useState } from "react"
import { tokenManager } from "@/lib/token-manager"

export function useTokenRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  useEffect(() => {
    const handleTokenRefreshed = () => {
      setIsRefreshing(false)
      setLastRefresh(new Date())
    }

    const handleTokenCleared = () => {
      setIsRefreshing(false)
      setLastRefresh(null)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("tokenRefreshed", handleTokenRefreshed)
      window.addEventListener("tokenCleared", handleTokenCleared)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("tokenRefreshed", handleTokenRefreshed)
        window.removeEventListener("tokenCleared", handleTokenCleared)
      }
    }
  }, [])

  const manualRefresh = async () => {
    setIsRefreshing(true)
    try {
      await tokenManager.refreshTokens()
    } finally {
      setIsRefreshing(false)
    }
  }

  return {
    isRefreshing,
    lastRefresh,
    manualRefresh,
    isTokenValid: tokenManager.isTokenValid(),
  }
}
