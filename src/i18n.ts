import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en"

  const stored = window.localStorage.getItem("language")
  return stored || "en"
}

i18n.use(initReactI18next).init({
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  // Disable Suspense so components render immediately (helps in tests too)
  react: {
    useSuspense: false,
  },
})

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr"
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem("language", lng)
  }
})

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language
  document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
}

export default i18n


