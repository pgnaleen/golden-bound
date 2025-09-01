"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Language, Translations } from "@/lib/i18n"
import { getTranslations, isRTL } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem("language") as Language
    let browserLanguage: Language = "en"

    const navLang = navigator.language.toLowerCase()
    if (navLang.startsWith("he")) browserLanguage = "he"
    else if (navLang.startsWith("ar")) browserLanguage = "ar"
    else if (navLang.startsWith("es")) browserLanguage = "es"
    else if (navLang.startsWith("fr")) browserLanguage = "fr"

    const initialLanguage = savedLanguage || browserLanguage

    setLanguageState(initialLanguage)

    // Set document direction and language
    document.documentElement.lang = initialLanguage
    document.documentElement.dir = isRTL(initialLanguage) ? "rtl" : "ltr"
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Update document direction and language
    document.documentElement.lang = newLanguage
    document.documentElement.dir = isRTL(newLanguage) ? "rtl" : "ltr"
  }

  const createTranslationFunction = (translations: Translations) => {
    return (key: string): string => {
      const keys = key.split(".")
      let value: any = translations

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k]
        } else {
          console.warn(`Translation key "${key}" not found`)
          return key // Return the key if translation not found
        }
      }

      return typeof value === "string" ? value : key
    }
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: createTranslationFunction(getTranslations(language)),
    isRTL: isRTL(language),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
