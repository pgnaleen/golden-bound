import { type NextRequest, NextResponse } from "next/server"

interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

// Mock user database - In production, this would be a real database
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
    const body: RegisterRequest = await request.json()
    const { username, email, password, firstName, lastName } = body

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.username === username || u.email === email)

    if (existingUser) {
      return NextResponse.json({ error: "Username or email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      username,
      email,
      password, // In production, hash this password
      firstName: firstName || "",
      lastName: lastName || "",
    }

    // Add to mock database
    mockUsers.push(newUser)

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
