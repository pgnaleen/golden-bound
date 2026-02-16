import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { config } from "./config";
import type { User, AuthTokens } from "@/types/auth";

const jwtSecret = new TextEncoder().encode(config.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(config.JWT_REFRESH_SECRET);

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, config.BCRYPT_ROUNDS);
    } catch (error) {
      throw new Error("Password hashing failed");
    }
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      return false;
    }
  }

  async generateTokens(user: User): Promise<AuthTokens> {
    try {
      const now = Math.floor(Date.now() / 1000);
      const accessTokenExpiry =
        now + this.parseTimeToSeconds(config.JWT_EXPIRES_IN);
      const refreshTokenExpiry =
        now + this.parseTimeToSeconds(config.JWT_REFRESH_EXPIRES_IN);

      const [accessToken, refreshToken] = await Promise.all([
        new SignJWT({
          sub: user.id,
          username: user.username,
          email: user.email,
          type: "access",
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt(now)
          .setExpirationTime(accessTokenExpiry)
          .sign(jwtSecret),

        new SignJWT({
          sub: user.id,
          type: "refresh",
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt(now)
          .setExpirationTime(refreshTokenExpiry)
          .sign(refreshSecret),
      ]);

      return {
        accessToken,
        refreshToken,
        expiresIn: accessTokenExpiry,
        tokenType: "Bearer",
      };
    } catch (error) {
      throw new Error("Token generation failed");
    }
  }

  async verifyAccessToken(
    token: string
  ): Promise<{ sub: string; username: string; email: string } | null> {
    try {
      const { payload } = await jwtVerify(token, jwtSecret);

      if (payload.type !== "access") {
        return null;
      }

      return {
        sub: payload.sub as string,
        username: payload.username as string,
        email: payload.email as string,
      };
    } catch (error) {
      logger.debug("Access token verification failed", {
        error: error.message,
      });
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<{ sub: string } | null> {
    try {
      const { payload } = await jwtVerify(token, refreshSecret);

      if (payload.type !== "refresh") {
        return null;
      }

      return {
        sub: payload.sub as string,
      };
    } catch (error) {
      return null;
    }
  }

  private parseTimeToSeconds(timeString: string): number {
    const unit = timeString.slice(-1);
    const value = Number.parseInt(timeString.slice(0, -1));

    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 60 * 60;
      case "d":
        return value * 24 * 60 * 60;
      default:
        return 3600; // Default to 1 hour
    }
  }
}

export const authService = new AuthService();
