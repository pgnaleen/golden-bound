import { z } from "zod"
import { getTranslations, type Language } from "./i18n"

export function createValidationSchemas(language: Language) {
  const t = getTranslations(language)

  const loginSchema = z.object({
    username: z.string().min(1, t.usernameRequired),
    password: z.string().min(1, t.passwordRequired),
  })

  const registerSchema = z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      username: z.string().min(1, t.usernameRequired),
      email: z.string().email(t.invalidEmail),
      password: z.string().min(6, t.passwordTooShort),
      confirmPassword: z.string().min(1, t.passwordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.passwordsDoNotMatch,
      path: ["confirmPassword"],
    })

  const forgotPasswordSchema = z.object({
    email: z.string().email(t.invalidEmail),
  })

  const verificationSchema = z.object({
    email: z.string().email(t.invalidEmail),
    code: z.string().length(6, "Verification code must be 6 digits"), // Keep English for now as it's technical
  })

  return {
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    verificationSchema,
  }
}

const defaultSchemas = createValidationSchemas("en")
export const loginSchema = defaultSchemas.loginSchema
export const registerSchema = defaultSchemas.registerSchema
export const forgotPasswordSchema = defaultSchemas.forgotPasswordSchema
export const verificationSchema = defaultSchemas.verificationSchema

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type VerificationFormData = z.infer<typeof verificationSchema>
