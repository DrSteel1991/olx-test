import Icon from "@/ui/Icon/Icon"
import { useTranslation } from "react-i18next"

const HomeHeaderLocationDropdown = () => {
    const { t } = useTranslation("home")

    return (
        <div className="flex h-11 items-center border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800">
            <Icon
                name="place"
                fontSize="small"
                className="mr-2 text-yellow-400"
            />
            <span>
                {t("header.location", {
                    defaultValue: "Lebanon",
                })}
            </span>
            <Icon
                name="expandMore"
                fontSize="small"
                className="ml-2 text-gray-500"
            />
        </div>
    )
}

export default HomeHeaderLocationDropdown



