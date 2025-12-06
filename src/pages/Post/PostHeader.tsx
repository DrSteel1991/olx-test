import Section from "@/ui/Section"
import { useTranslation } from "react-i18next"

const PostHeader = () => {
    const { t } = useTranslation("post")

    return (
        <Section>
            <div className="mb-3 mt-6 flex flex-col gap-5">
                <span className="text-3xl font-bold text-gray-900">
                    {t("title")}
                </span>
                <span className="text-base font-bold text-gray-800">
                    {t("subtitle")}
                </span>
            </div>
        </Section>
    )
}

export default PostHeader


