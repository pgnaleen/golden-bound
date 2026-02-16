import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    // In production, this would call AWS Cognito's confirmSignUp API
    console.log("[v0] Email verification attempt:", { email, code })

    // Simulate verification logic
    if (!email || !code) {
      return NextResponse.json({ message: "Email and verification code are required" }, { status: 400 })
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ message: "Invalid verification code format" }, { status: 400 })
    }

    // Mock successful verification (in production, verify with AWS Cognito)
    if (code === "123456") {
      return NextResponse.json({
        message: "Email verified successfully",
        verified: true,
      })
    }

    // Mock invalid code
    return NextResponse.json({ message: "Invalid verification code" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Email verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
