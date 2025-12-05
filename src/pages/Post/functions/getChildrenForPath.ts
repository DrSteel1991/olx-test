import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"

export const getChildrenForPath = (
    roots: useGetCategoriesQueryResponseSuccess[],
    path: number[],
): useGetCategoriesQueryResponseSuccess[] => {
    let children = roots

    for (const id of path) {
        const found = children.find((category) => category.id === id)
        if (!found || !found.children) {
            return []
        }
        children = found.children
    }

    return children
}