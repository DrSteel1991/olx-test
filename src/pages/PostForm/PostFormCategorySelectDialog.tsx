import Dialog from "@mui/material/Dialog"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import PostCardView from "@/pages/Post/PostCardView"
import PostListView from "@/pages/Post/PostListView/PostListView"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface Props {
    open: boolean
    onClose: () => void
    onCategorySelected: (categoryExternalID: string, categoryId: number) => void
    categories: useGetCategoriesQueryResponseSuccess[] | undefined
    isArabic: boolean
}

const CategorySelectDialog = ({
    open,
    onClose,
    onCategorySelected,
    categories,
    isArabic,
}: Props) => {
    const { t } = useTranslation("postForm")
    const [showListView, setShowListView] = useState(false)
    const [selectedPath, setSelectedPath] = useState<number[]>([])

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

    const handleClose = () => {
        setShowListView(false)
        setSelectedPath([])
        onClose()
    }

    const handleLeafCategorySelected = (
        categoryExternalID: string,
        categoryId: number,
    ) => {
        onCategorySelected(categoryExternalID, categoryId)
        setShowListView(false)
        setSelectedPath([])
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
        >
            <div className="px-8 py-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        {t("category.modalTitle", {
                            defaultValue: "Choose a category",
                        })}
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-2xl leading-none text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

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
            </div>
        </Dialog>
    )
}

export default CategorySelectDialog


