import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import PostListViewRow from "./PostListViewRow"

interface Props {
    categories: useGetCategoriesQueryResponseSuccess[]
    isArabic: boolean
    selectedPath: number[]
    hasImage: boolean
    level: number
    handleSelectInColumn: (level: number, id: number) => void
}

const PostListViewColumn = ({ categories, isArabic, selectedPath, hasImage, handleSelectInColumn, level }: Props) => {
    return (
        <div className="flex flex-col border-r border-gray-200 bg-white">
            {categories.map((category) => (
                <PostListViewRow
                    key={category.id}
                    label={isArabic ? category.name_l1 : category.name}
                    iconSrc={hasImage ? `/assets/images/inlineCategories/${category.slug}_noinline.svg` : undefined}
                    hasChildren={!!category.children?.length}
                    isSelected={selectedPath[0] === category.id}
                    onClick={() => handleSelectInColumn(level, category.id)}
                />
            ))}
        </div>
    )
}

export default PostListViewColumn