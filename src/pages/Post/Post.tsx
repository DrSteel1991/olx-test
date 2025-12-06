import Section from "@/ui/Section"
import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import { useTranslation } from "react-i18next"
import { initPostI18n } from "./i18n"
import PostHeader from "./PostHeader"
import { useState } from "react"
import PostCardView from "./PostCardView"
import PostListView from "./PostListView/PostListView"
import { useNavigate } from "react-router-dom"
import { usePrefetchCategoryFields } from "@/queries/CategoryFields/useGetCategoryFieldsQuery"

initPostI18n()

const Post = () => {
    const [showListView, setShowListView] = useState(false)
    const [selectedPath, setSelectedPath] = useState<number[]>([])
    const { data: categories } = useGetCategoriesQuery()
    const { t, i18n } = useTranslation("post")
    const navigate = useNavigate()
    const { prefetchCategoryFields } = usePrefetchCategoryFields()

    const isArabic = i18n.language === "ar"

    const handleShowListView = (categoryId: number) => {
        setShowListView(true)
        setSelectedPath([categoryId])
    }

    const handleSelectInColumn = (level: number, id: number) => {
        setSelectedPath((prev) => {
            const next = prev.slice(0, level)
            next[level] = id
            return next
        })
    }

    const handleLeafCategorySelected = async (
        categoryExternalID: string,
        categoryId: number,
    ) => {
        await prefetchCategoryFields(categoryExternalID, categoryId)
        navigate("/post-form")
    }

    return (
        <>
            <PostHeader />
            <Section>
                <div className="flex flex-col gap-5 mb-3 mt-6">
                    <span className="text-3xl font-bold text-gray-900">
                        {t("title")}
                    </span>
                    <span className="text-base font-bold text-gray-800">
                        {t("subtitle")}
                    </span>
                </div>
            </Section>
            {!showListView && (
                <PostCardView
                    categories={categories || []}
                    isArabic={isArabic}
                    handleShowListView={handleShowListView}
                />
            )}

            {showListView && (
                <PostListView
                    categories={categories || []}
                    isArabic={isArabic}
                    selectedPath={selectedPath}
                    handleSelectInColumn={handleSelectInColumn}
                    onLeafCategorySelected={handleLeafCategorySelected}
                />
            )}
        </>
    )
}

export default Post