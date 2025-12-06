import i18n from "@/i18n"
import en from "./en.json"
import ar from "./ar.json"

const NS = "postForm"

let initialized = false

export const initPostFormI18n = () => {
    if (initialized) return

    if (!i18n.hasResourceBundle("en", NS)) {
        i18n.addResourceBundle("en", NS, en, true, true)
    }

    if (!i18n.hasResourceBundle("ar", NS)) {
        i18n.addResourceBundle("ar", NS, ar, true, true)
    }

    initialized = true
}


