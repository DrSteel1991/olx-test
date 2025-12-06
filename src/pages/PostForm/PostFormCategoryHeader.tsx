import { useTranslation } from "react-i18next"

interface Props {
    parentName: string
    leafName: string
    parentImageSrc?: string
    onChangeClick: () => void
}

const PostFormCategoryHeader = ({
    parentName,
    leafName,
    parentImageSrc,
    onChangeClick,
}: Props) => {
    const { t } = useTranslation("postForm")

    return (
        <div className="mb-6 flex items-center justify-between gap-6">
            <div className="w-40 shrink-0 text-sm font-semibold text-gray-800">
                {t("category.label", { defaultValue: "Category" })}
            </div>
            <div className="flex flex-1 items-center gap-4">
                {parentImageSrc && (
                    <img
                        src={parentImageSrc}
                        alt={parentName}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                )}
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                        {parentName}
                    </span>
                    <span className="text-sm text-gray-600">
                        {leafName}
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={onChangeClick}
                className="text-sm font-semibold text-[#23a5e6]"
            >
                {t("category.change", { defaultValue: "Change" })}
            </button>
        </div>
    )
}

export default PostFormCategoryHeader


