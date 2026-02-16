import type { AuthTokens } from "@/types/auth";
import { authStorage } from "./auth-storage";

class TokenManager {
  private refreshPromise: Promise<boolean> | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor() {
    // Start automatic refresh timer when tokens are available
    this.initializeAutoRefresh();
  }

  private initializeAutoRefresh(): void {
    if (typeof window === "undefined") return;

    const tokens = authStorage.getTokens();
    if (tokens && !authStorage.isTokenExpired(tokens)) {
      this.scheduleTokenRefresh(tokens);
    }
  }

  private scheduleTokenRefresh(tokens: AuthTokens): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    const now = Date.now();
    const expirationTime = tokens.expiresIn * 1000;
    const refreshTime = expirationTime - now - 5 * 60 * 1000; // 5 minutes before expiry

    console.log("[v0] Token refresh scheduling:", {
      now: new Date(now).toISOString(),
      expirationTime: new Date(expirationTime).toISOString(),
      refreshTime: refreshTime,
      refreshTimeMinutes: Math.round(refreshTime / 1000 / 60),
    });

    // Only schedule if refresh time is positive and reasonable (at least 1 minute)
    if (refreshTime > 60 * 1000) {
      this.refreshTimer = setTimeout(() => {
        console.log("[v0] Executing scheduled token refresh");
        this.refreshTokens();
      }, refreshTime);
    } else {
      console.log(
        "[v0] Token expires soon or already expired, not scheduling refresh"
      );
      // If token expires very soon, don't schedule automatic refresh
      // Let the HTTP interceptor handle it when needed
    }
  }

  async refreshTokens(): Promise<boolean> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      console.log("[v0] Refresh already in progress, waiting...");
      return this.refreshPromise;
    }

    const tokens = authStorage.getTokens();
    if (!tokens) {
      console.log("[v0] No tokens available for refresh");
      return false;
    }

    console.log("[v0] Starting token refresh...");
    this.refreshPromise = this.performTokenRefresh(tokens.refreshToken);

    try {
      const success = await this.refreshPromise;
      if (success) {
        const newTokens = authStorage.getTokens();
        if (newTokens) {
          console.log("[v0] Token refresh successful, scheduling next refresh");
          this.scheduleTokenRefresh(newTokens);
        }
      } else {
        console.log("[v0] Token refresh failed");
      }
      return success;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(refreshToken: string): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { tokens } = await response.json();
        authStorage.setTokens(tokens);

        // Dispatch custom event for token refresh
        window.dispatchEvent(
          new CustomEvent("tokenRefreshed", { detail: tokens })
        );

        return true;
      } else {
        // Refresh failed, clear tokens
        this.clearTokens();
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      this.clearTokens();
      return false;
    }
  }

  setTokens(tokens: AuthTokens): void {
    console.log("[v0] Setting new tokens:", {
      expiresIn: tokens.expiresIn,
      expirationTime: new Date(tokens.expiresIn * 1000).toISOString(),
    });
    authStorage.setTokens(tokens);
    this.scheduleTokenRefresh(tokens);
  }

  clearTokens(): void {
    console.log("[v0] Clearing tokens and refresh timer");
    authStorage.removeTokens();

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    // Dispatch custom event for token cleared
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tokenCleared"));
    }
  }

  isTokenValid(): boolean {
    const tokens = authStorage.getTokens();
    return tokens ? !authStorage.isTokenExpired(tokens) : false;
  }

  getAccessToken(): string | null {
    const tokens = authStorage.getTokens();
    return tokens && !authStorage.isTokenExpired(tokens)
      ? tokens.accessToken
      : null;
  }

  // Session timeout handling
  private sessionTimeoutTimer: NodeJS.Timeout | null = null;
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  startSessionTimeout(): void {
    this.resetSessionTimeout();

    // Listen for user activity
    if (typeof window !== "undefined") {
      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];
      events.forEach((event) => {
        document.addEventListener(
          event,
          this.resetSessionTimeout.bind(this),
          true
        );
      });
    }
  }

  private resetSessionTimeout(): void {
    if (this.sessionTimeoutTimer) {
      clearTimeout(this.sessionTimeoutTimer);
    }

    this.sessionTimeoutTimer = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.SESSION_TIMEOUT);
  }

  private handleSessionTimeout(): void {
    this.clearTokens();

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sessionTimeout"));
      // Redirect to login with timeout message
      window.location.href =
        "/login?message=Session expired. Please sign in again.";
    }
  }

  stopSessionTimeout(): void {
    if (this.sessionTimeoutTimer) {
      clearTimeout(this.sessionTimeoutTimer);
      this.sessionTimeoutTimer = null;
    }

    // Remove event listeners
    if (typeof window !== "undefined") {
      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];
      events.forEach((event) => {
        document.removeEventListener(
          event,
          this.resetSessionTimeout.bind(this),
          true
        );
      });
    }
  }
}

export const tokenManager = new TokenManager();
