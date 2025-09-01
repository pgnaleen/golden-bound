"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Eye, EyeOff, Lock, User, Mail } from "lucide-react"
import { httpClient } from "@/lib/http-client"
import { createValidationSchemas } from "@/lib/validation-schemas"

export default function RegisterPage() {
  const { t, isRTL, language } = useLanguage()
  const { registerSchema } = createValidationSchemas(language)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isAuthenticated } = useAuth()
  const router = useRouter()

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
      const validatedData = registerSchema.parse(formData)

      await httpClient.post("/auth/register", {
        username: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      })

      router.push(`/verify-email?email=${encodeURIComponent(validatedData.email)}`)
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
        setError("Registration failed. Username or email may already be taken.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center text-balance">{t("createAccount")}</CardTitle>
          <CardDescription className="text-center text-pretty">{t("enterInfoToCreateAccount")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder={t("firstNamePlaceholder")}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={fieldErrors.firstName ? "border-red-500 focus:border-red-500" : ""}
                  disabled={isSubmitting}
                />
                <FieldError error={fieldErrors.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder={t("lastNamePlaceholder")}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={fieldErrors.lastName ? "border-red-500 focus:border-red-500" : ""}
                  disabled={isSubmitting}
                />
                <FieldError error={fieldErrors.lastName} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t("username")} *</Label>
              <div className="relative">
                <User className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t("usernamePlaceholder")}
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`${isRTL ? "pr-10" : "pl-10"} ${fieldErrors.username ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
              </div>
              <FieldError error={fieldErrors.username} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")} *</Label>
              <div className="relative">
                <Mail className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${isRTL ? "pr-10" : "pl-10"} ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
              </div>
              <FieldError error={fieldErrors.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")} *</Label>
              <div className="relative">
                <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("createPasswordPlaceholder")}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} ${fieldErrors.password ? "border-red-500 focus:border-red-500" : ""}`}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")} *</Label>
              <div className="relative">
                <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} ${fieldErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute top-3 text-muted-foreground hover:text-foreground ${isRTL ? "left-3" : "right-3"}`}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FieldError error={fieldErrors.confirmPassword} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  {t("creatingAccount")}
                </>
              ) : (
                t("createAccount")
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline">
                {t("signInHere")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
