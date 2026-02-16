import { type NextRequest, NextResponse } from "next/server"
import type { LoginCredentials, AuthResponse } from "@/types/auth"

// Mock user database - In production, this would be a real database
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "password123", // In production, this would be hashed
    firstName: "Admin",
    lastName: "User",
  },
  {
    id: "2",
    username: "demo",
    email: "demo@example.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "User",
  },
]

// Mock function to generate JWT tokens - In production, use a proper JWT library
function generateTokens(userId: string) {
  const now = Date.now()
  const expiresIn = now + 60 * 60 * 1000 // 1 hour from now

  return {
    accessToken: `mock_access_token_${userId}_${now}`,
    refreshToken: `mock_refresh_token_${userId}_${now}`,
    expiresIn,
    tokenType: "Bearer",
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Find user
    const user = mockUsers.find((u) => (u.username === username || u.email === username) && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // Generate tokens
    const tokens = generateTokens(user.id)

    // Prepare response
    const response: AuthResponse = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      tokens,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
