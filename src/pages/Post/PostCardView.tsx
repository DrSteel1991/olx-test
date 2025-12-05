import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import Section from "@/ui/Section"
import PostCategoryCard from "./PostCategoryCard"

interface Props {
    categories: useGetCategoriesQueryResponseSuccess[]
    isArabic: boolean
    handleShowListView: (categoryId: number) => void
}

const PostCardView = ({ categories, isArabic, handleShowListView }: Props) => {
    return (
        <Section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg">
                {categories.map((category) => (
                    <PostCategoryCard
                        key={category.id}
                        category={category}
                        isArabic={isArabic}
                        onClick={() => handleShowListView(category.id)}
                    />
                ))}
            </div>
        </Section>
    )
}

export default PostCardView