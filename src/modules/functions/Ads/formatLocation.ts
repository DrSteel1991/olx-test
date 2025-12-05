import i18n from "@/i18n"

export const formatLocation = (locations: Record<string, string>) => i18n.language === "ar" ? locations.ar : locations.en


