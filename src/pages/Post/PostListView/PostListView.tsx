import Section from "@/ui/Section"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import PostListViewColumn from "./PostListViewColumn"
import { getChildrenForPath } from "@/pages/Post/functions/getChildrenForPath"

interface Props {
    categories: useGetCategoriesQueryResponseSuccess[]
    isArabic: boolean
    selectedPath: number[]
    handleSelectInColumn: (level: number, id: number) => void
}

const PostListView = ({
    categories,
    isArabic,
    selectedPath,
    handleSelectInColumn,
}: Props) => {
    const rootCategories =
        categories?.filter((category) => category.parentID === null) ?? []

    const level1Children =
        selectedPath.length >= 1
            ? getChildrenForPath(rootCategories, selectedPath.slice(0, 1))
            : []

    const level2Children =
        selectedPath.length >= 2
            ? getChildrenForPath(rootCategories, selectedPath.slice(0, 2))
            : []

    return (
        <Section>
            <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden border border-gray-200">
                <PostListViewColumn
                    categories={rootCategories}
                    isArabic={isArabic}
                    selectedPath={selectedPath}
                    hasImage={true}
                    level={0}
                    handleSelectInColumn={handleSelectInColumn}
                />
                <PostListViewColumn
                    categories={level1Children}
                    isArabic={isArabic}
                    selectedPath={selectedPath}
                    hasImage={false}
                    level={1}
                    handleSelectInColumn={handleSelectInColumn}
                />
                <PostListViewColumn
                    categories={level2Children}
                    isArabic={isArabic}
                    selectedPath={selectedPath}
                    hasImage={false}
                    level={2}
                    handleSelectInColumn={handleSelectInColumn}
                />
            </div>
        </Section>
    )
}

export default PostListView