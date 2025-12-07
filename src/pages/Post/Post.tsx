import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import { useTranslation } from "react-i18next"
import { initPostI18n } from "./i18n"
import Header from "@/modules/Header/Header"
import { useState } from "react"
import PostCardView from "./PostCardView"
import PostListView from "./PostListView/PostListView"
import { useNavigate } from "react-router-dom"
import { usePrefetchCategoryFields } from "@/queries/CategoryFields/useGetCategoryFieldsQuery"
import PostCategoriesSkeleton from "./PostCategoriesSkeleton"
import PostHeader from "./PostHeader"

initPostI18n()

const Post = () => {
    const [showListView, setShowListView] = useState(false)
    const [selectedPath, setSelectedPath] = useState<number[]>([])
    const { data: categories, isLoading, isFetching } = useGetCategoriesQuery()
    const { i18n } = useTranslation("post")
    const navigate = useNavigate()
    const { prefetchCategoryFields } = usePrefetchCategoryFields()

    const isArabic = i18n.language === "ar"
    const isLoadingCategories = isLoading || isFetching

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
            <Header navigationUrl="/" />
            <PostHeader />
            {isLoadingCategories ? (
                <PostCategoriesSkeleton />
            ) : !showListView ? (
                <PostCardView
                    categories={categories || []}
                    isArabic={isArabic}
                    handleShowListView={handleShowListView}
                />
            ) : (
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