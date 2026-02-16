"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FieldError } from "@/components/ui/field-error"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { httpClient } from "@/lib/http-client"
import { forgotPasswordSchema } from "@/lib/validation-schemas"

export default function ForgotPasswordPage() {
  const { t, isRTL } = useLanguage()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear errors when user starts typing
    if (error) setError("")
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const validatedData = forgotPasswordSchema.parse({ email })

      await httpClient.post("/auth/forgot-password", validatedData)
      setIsSuccess(true)
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
        setError(t("resetEmailFailed"))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-background px-4 ${isRTL ? "rtl" : "ltr"}`}>
        <div className="w-full max-w-md space-y-4">
          <div className={`flex ${isRTL ? "justify-start" : "justify-end"} mb-4`}>
            <LanguageSwitcher />
          </div>

          <Card className="w-full">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-balance">{t("checkYourEmail")}</CardTitle>
              <CardDescription className="text-pretty">
                {t("resetLinkSent")} <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>{t("emailNotFoundMessage")}</AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
                  {t("backToSignIn")}
                </Button>
              </Link>
              <button
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                }}
                className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
              >
                {t("tryDifferentEmail")}
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background px-4 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="w-full max-w-md space-y-4">
        <div className={`flex ${isRTL ? "justify-start" : "justify-end"} mb-4`}>
          <LanguageSwitcher />
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-balance">{t("forgotPasswordTitle")}</CardTitle>
            <CardDescription className="text-center text-pretty">{t("forgotPasswordDescription")}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t("emailAddress")}</Label>
                <div className="relative">
                  <Mail className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder={t("emailAddressPlaceholder")}
                    value={email}
                    onChange={handleInputChange}
                    className={`${isRTL ? "pr-10 text-right" : "pl-10"} ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                <FieldError error={fieldErrors.email} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    {t("sendingResetLink")}
                  </>
                ) : (
                  t("sendResetLink")
                )}
              </Button>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
                  {t("backToSignIn")}
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
