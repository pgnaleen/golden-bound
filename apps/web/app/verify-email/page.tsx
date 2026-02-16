"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"
import { Mail, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const { t, isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== "") && value) {
      handleVerify(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }

    setCode(newCode)

    if (pastedData.length === 6) {
      handleVerify(pastedData)
    }
  }

  const handleVerify = async (verificationCode: string) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/login?verified=true")
      } else {
        setError(data.message || t("verification.error"))
        setCode(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      setError(t("verification.networkError"))
      setCode(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setError("")

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setResendCooldown(60) // 60 second cooldown
      } else {
        const data = await response.json()
        setError(data.message || t("verification.resendError"))
      }
    } catch (error) {
      setError(t("verification.networkError"))
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-balance">{t("verification.title")}</CardTitle>
            <CardDescription className="text-pretty mt-2">
              {t("verification.description")} <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className={`flex gap-3 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-primary"
                  disabled={isLoading}
                />
              ))}
            </div>

            <Button
              onClick={() => handleVerify(code.join(""))}
              disabled={isLoading || code.some((digit) => digit === "")}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  {t("verification.verifying")}
                </>
              ) : (
                t("verification.verify")
              )}
            </Button>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{t("verification.noCode")}</p>

            <Button
              variant="outline"
              onClick={handleResendCode}
              disabled={isResending || resendCooldown > 0}
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  {t("verification.resending")}
                </>
              ) : resendCooldown > 0 ? (
                `${t("verification.resendIn")} ${resendCooldown}s`
              ) : (
                t("verification.resend")
              )}
            </Button>

            <Link
              href="/register"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
              {t("verification.backToRegister")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
