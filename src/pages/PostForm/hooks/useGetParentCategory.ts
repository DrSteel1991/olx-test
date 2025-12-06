import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import { getCategoryPathById } from "@/pages/PostForm/functions/getCategoryPathById"

interface Result {
    parentCategory?: useGetCategoriesQueryResponseSuccess
    leafCategory?: useGetCategoriesQueryResponseSuccess
    parentName: string
    leafName: string
    parentImageSrc?: string
}

export const useGetParentCategory = (
    categories: useGetCategoriesQueryResponseSuccess[] | undefined,
    currentCategoryId: number | undefined,
    isRtl: boolean,
): Result => {
    const categoryPath = getCategoryPathById(categories, currentCategoryId)
    const parentCategory = categoryPath[0]
    const leafCategory =
        categoryPath[categoryPath.length - 1] || parentCategory

    const parentName = parentCategory
        ? isRtl
            ? parentCategory.name_l1
            : parentCategory.name
        : ""

    const leafName = leafCategory
        ? isRtl
            ? leafCategory.name_l1
            : leafCategory.name
        : ""

    const parentImageSrc = parentCategory
        ? `/assets/images/categories/${parentCategory.slug}.png`
        : undefined

    return {
        parentCategory,
        leafCategory,
        parentName,
        leafName,
        parentImageSrc,
    }
}


