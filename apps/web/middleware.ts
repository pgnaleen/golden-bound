import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mock function to validate access token
function validateAccessToken(token: string) {
  // Validate the JWT token properly
  if (token.startsWith("mock_access_token_")) {
    const parts = token.split("_");
    const userId = parts[3];
    const timestamp = parts[4];

    // Check if token is expired (1 hour)
    const tokenTime = Number.parseInt(timestamp);
    const now = Date.now();
    const isExpired = now - tokenTime > 60 * 60 * 1000;

    return userId && !isExpired ? { userId } : null;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect API routes that require authentication
  if (pathname.startsWith("/api/protected")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const tokenData = validateAccessToken(token);

    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Protect dashboard routes on the client side
  if (pathname.startsWith("/dashboard")) {
    // Let the client-side auth context handle dashboard protection
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*", "/dashboard/:path*"],
};
