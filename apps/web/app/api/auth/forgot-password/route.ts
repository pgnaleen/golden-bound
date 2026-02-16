import { type NextRequest, NextResponse } from "next/server"

interface ForgotPasswordRequest {
  email: string
}

// Mock user database
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "password123",
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

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordRequest = await request.json()
    const { email } = body

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if user exists
    const user = mockUsers.find((u) => u.email === email)

    // Always return success for security reasons (don't reveal if email exists)
    // In production, send actual password reset email
    console.log(`Password reset requested for: ${email}`)
    if (user) {
      console.log(`User found: ${user.username}`)
      // In production: Generate reset token and send email
    } else {
      console.log("User not found, but returning success for security")
    }

    return NextResponse.json({
      message: "If an account with that email exists, a password reset link has been sent.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
