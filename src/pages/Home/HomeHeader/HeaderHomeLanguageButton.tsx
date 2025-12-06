import { useTranslation } from "react-i18next"

interface Props {
    isArabic: boolean
    onClick: () => void
}

const HeaderHomeLanguageButton = ({ onClick }: Props) => {
    const { t } = useTranslation("home")

    const label = t("header.language")

    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer text-sm font-medium text-gray-800"
        >
            {label}
        </button>
    )
}

export default HeaderHomeLanguageButton


