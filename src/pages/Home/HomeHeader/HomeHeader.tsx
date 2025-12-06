import { useTranslation } from "react-i18next"
import Section from "@/ui/Section"
import { useNavigate } from "react-router-dom"
import HomeHeaderLogo from "./HomeHeaderLogo"
import HomeHeaderLocationDropdown from "./HomeHeaderLocationDropdown"
import HomeHeaderSearchField from "./HomeHeaderSearchField"
import HeaderHomeLanguageButton from "./HeaderHomeLanguageButton"
import HomeHeaderChatButton from "./HomeHeaderChatButton"
import HomeHeaderNotificationsButton from "./HomeHeaderNotificationsButton"
import HomeHeaderProfileButton from "./HomeHeaderProfileButton"
import HomeHeaderSellButton from "./HomeHeaderSellButton"

const HomeHeader = () => {
    const { i18n, t } = useTranslation("home")
    const navigate = useNavigate()

    const isArabic = i18n.language === "ar"

    const toggleLanguage = () => {
        i18n.changeLanguage(isArabic ? "en" : "ar")
    }


    const handleSellClick = () => {
        navigate("/post")
    }

    return (
        <Section>
            <div className="px-4 sm:px-0">
                <div className="flex w-full flex-col gap-4">
                    <HomeHeaderLogo />

                    <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
                        <div className="flex w-full flex-1 flex-wrap items-center gap-3">
                            <HomeHeaderLocationDropdown />
                            <HomeHeaderSearchField />
                        </div>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <HeaderHomeLanguageButton
                                isArabic={isArabic}
                                onClick={toggleLanguage}
                            />
                            <HomeHeaderChatButton />
                            <HomeHeaderNotificationsButton />
                            <HomeHeaderProfileButton />
                            <HomeHeaderSellButton
                                label={t("categories.sell")}
                                onClick={handleSellClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default HomeHeader


