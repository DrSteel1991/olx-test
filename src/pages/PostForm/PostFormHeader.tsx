import { useTranslation } from "react-i18next"

const PostFormHeader = () => {
    const { t } = useTranslation("postForm")

    return (
        <div className="mb-3 mt-6 flex flex-col gap-5">
            <span className="text-3xl font-bold text-gray-900">
                {t("title")}
            </span>
        </div>
    )
}

export default PostFormHeader


