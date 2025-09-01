import { type NextRequest, NextResponse } from "next/server"

// Mock function to validate access token
function validateAccessToken(token: string) {
  // In production, validate the JWT token properly
  if (token.startsWith("mock_access_token_")) {
    const parts = token.split("_")
    const userId = parts[3]
    return userId ? { userId } : null
  }
  return null
}

// Mock user database
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
  },
  {
    id: "2",
    username: "demo",
    email: "demo@example.com",
    firstName: "Demo",
    lastName: "User",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    // Extract token
    const token = authHeader.substring(7)
    const tokenData = validateAccessToken(token)

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    // Find user
    const user = mockUsers.find((u) => u.id === tokenData.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
