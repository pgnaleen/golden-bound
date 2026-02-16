import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // In production, this would call AWS Cognito's resendConfirmationCode API
    console.log("[v0] Resending verification code to:", email)

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Mock successful resend
    return NextResponse.json({
      message: "Verification code sent successfully",
      sent: true,
    })
  } catch (error) {
    console.error("[v0] Resend verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
