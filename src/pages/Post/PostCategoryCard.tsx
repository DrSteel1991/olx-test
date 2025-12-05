import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import Icon from "@/ui/Icon/Icon"

interface Props {
    category: useGetCategoriesQueryResponseSuccess
    isArabic: boolean
    onClick: () => void
}

const PostCategoryCard = ({ category, isArabic, onClick }: Props) => {
    const displayName = isArabic ? category.name_l1 : category.name

    return (
        <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 text-left shadow-sm hover:border-gray-300 hover:shadow-md"
            onClick={onClick}
        >
            <div className="flex items-center gap-4">

                <img
                    className="h-12 w-12 object-contain"
                    src={`/assets/images/categories/${category.slug}.png`}
                    alt={displayName}
                />
                <span className="text-sm font-light text-gray-900">
                    {displayName}
                </span>
            </div>
            <Icon name="chevronRight" fontSize="large" />
        </button >
    )
}

export default PostCategoryCard


