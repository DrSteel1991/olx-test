import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

// Keep HTML `dir` and `lang` in sync with the active language
i18n.on("languageChanged", (lng) => {
  if (typeof document === "undefined") return

  document.documentElement.lang = lng
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr"
})

// Initialize once for the default language on first load
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language
  document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
}

export default i18n


