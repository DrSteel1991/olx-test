import Icon from "@/ui/Icon/Icon"
import { useTranslation } from "react-i18next"

const HomeHeaderSearchField = () => {
    const { t } = useTranslation("home")

    const placeholder = t("header.searchPlaceholder", {
        defaultValue: "Find Cars, Mobile Phones and more...",
    })

    return (
        <div className="flex h-11 flex-1 items-stretch overflow-hidden border border-gray-300 bg-white">
            <input
                type="text"
                className="h-full w-full px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                placeholder={placeholder}
            />
            <button
                type="button"
                className="flex h-full items-center justify-center bg-[#23a5e6] px-4 text-white sm:px-6"
            >
                <Icon name="search" fontSize="medium" />
            </button>
        </div>
    )
}

export default HomeHeaderSearchField


