"use client"

import type React from "react"
import { createValidationSchemas } from "@/lib/validation-schemas"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FieldError } from "@/components/ui/field-error"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, isAuthenticated } = useAuth()
  const { t, isRTL, language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { loginSchema } = createValidationSchemas(language)

  // Get message from URL params (e.g., from registration success)
  const message = searchParams.get("message")

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/dashboard")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (error) setError("")
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const validatedData = loginSchema.parse(formData)
      await login(validatedData)
      router.push("/dashboard")
    } catch (err: any) {
      if (err.errors) {
        const newFieldErrors: Record<string, string> = {}
        err.errors.forEach((error: any) => {
          if (error.path && error.path.length > 0) {
            newFieldErrors[error.path[0]] = error.message
          }
        })
        setFieldErrors(newFieldErrors)
      } else {
        setError(err.message || t("invalidCredentials"))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background px-4 py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="w-full max-w-md space-y-4">
        <div className={`flex ${isRTL ? "justify-start" : "justify-end"} mb-4`}>
          <LanguageSwitcher />
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-balance">{t("welcomeBack")}</CardTitle>
            <CardDescription className="text-center text-pretty">{t("enterCredentials")}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {message && (
                <Alert className="mb-4">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="username">{t("username")}</Label>
                <div className="relative">
                  <User className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder={`${t("username")}...`}
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`${isRTL ? "pr-10 text-right" : "pl-10"} ${fieldErrors.username ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                <FieldError error={fieldErrors.username} />
                <p className="text-xs text-muted-foreground mt-1">Try: admin or demo</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={`${t("password")}...`}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10"} ${fieldErrors.password ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-3 text-muted-foreground hover:text-foreground ${isRTL ? "left-3" : "right-3"}`}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError error={fieldErrors.password} />
                <p className="text-xs text-muted-foreground mt-1">Admin: password123 | Demo: demo123</p>
              </div>

              <div className={`flex items-center ${isRTL ? "justify-start" : "justify-between"} pt-2`}>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    {t("signingIn")}
                  </>
                ) : (
                  t("signIn")
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground text-pretty">
                {t("dontHaveAccount")}{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  {t("createAccount")}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
