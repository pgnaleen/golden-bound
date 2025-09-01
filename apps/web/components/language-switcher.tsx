"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { ChevronDown, Globe } from "lucide-react"
import type { Language } from "@/lib/i18n"

const IsraeliFlag = () => (
  <svg className="h-4 w-4" viewBox="0 0 21 15" fill="none">
    <rect width="21" height="15" fill="white" />
    <rect width="21" height="2.5" fill="#0038b8" />
    <rect y="12.5" width="21" height="2.5" fill="#0038b8" />
    <path d="M10.5 4.5L12.5 6.5L10.5 8.5L8.5 6.5L10.5 4.5Z" stroke="#0038b8" strokeWidth="0.5" fill="none" />
    <path d="M10.5 6.5L12.5 8.5L10.5 10.5L8.5 8.5L10.5 6.5Z" stroke="#0038b8" strokeWidth="0.5" fill="none" />
  </svg>
)

const USFlag = () => (
  <svg className="h-4 w-4" viewBox="0 0 21 15" fill="none">
    <rect width="21" height="15" fill="#B22234" />
    <rect width="21" height="1.15" fill="white" />
    <rect y="2.31" width="21" height="1.15" fill="white" />
    <rect y="4.62" width="21" height="1.15" fill="white" />
    <rect y="6.92" width="21" height="1.15" fill="white" />
    <rect y="9.23" width="21" height="1.15" fill="white" />
    <rect y="11.54" width="21" height="1.15" fill="white" />
    <rect y="13.85" width="21" height="1.15" fill="white" />
    <rect width="8.4" height="8.08" fill="#3C3B6E" />
  </svg>
)

const ArabFlag = () => (
  <svg className="h-4 w-4" viewBox="0 0 21 15" fill="none">
    <rect width="21" height="15" fill="#006233" />
    <rect width="21" height="10" fill="white" />
    <rect width="21" height="5" fill="#000000" />
    <polygon points="0,0 7,7.5 0,15" fill="#CE1126" />
  </svg>
)

const SpanishFlag = () => (
  <svg className="h-4 w-4" viewBox="0 0 21 15" fill="none">
    <rect width="21" height="15" fill="#AA151B" />
    <rect y="3.75" width="21" height="7.5" fill="#F1BF00" />
  </svg>
)

const FrenchFlag = () => (
  <svg className="h-4 w-4" viewBox="0 0 21 15" fill="none">
    <rect width="7" height="15" fill="#002395" />
    <rect x="7" width="7" height="15" fill="white" />
    <rect x="14" width="7" height="15" fill="#ED2939" />
  </svg>
)

const languages = [
  { code: "en" as Language, name: "English", flag: USFlag },
  { code: "he" as Language, name: "עברית", flag: IsraeliFlag },
  { code: "ar" as Language, name: "العربية", flag: ArabFlag },
  { code: "es" as Language, name: "Español", flag: SpanishFlag },
  { code: "fr" as Language, name: "Français", flag: FrenchFlag },
]

export function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === language)
  const CurrentFlag = currentLanguage?.flag || Globe

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          <CurrentFlag />
          <span className="hidden sm:inline">{currentLanguage?.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-40">
        {languages.map((lang) => {
          const Flag = lang.flag
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`gap-3 ${isRTL ? "flex-row-reverse" : ""} ${language === lang.code ? "bg-accent" : ""}`}
            >
              <Flag />
              <span>{lang.name}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
