import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"

const flattenCategories = (
    categories: useGetCategoriesQueryResponseSuccess[] | undefined,
): useGetCategoriesQueryResponseSuccess[] => {
    if (!categories) return []
    const result: useGetCategoriesQueryResponseSuccess[] = []
    const stack = [...categories]

    while (stack.length) {
        const cat = stack.pop()!
        result.push(cat)
        if (cat.children && cat.children.length) {
            stack.push(...cat.children)
        }
    }

    return result
}

export const getCategoryPathById = (
    categories: useGetCategoriesQueryResponseSuccess[] | undefined,
    id: number | undefined,
): useGetCategoriesQueryResponseSuccess[] => {
    if (!categories || id === undefined) return []
    const flat = flattenCategories(categories)
    const byId = new Map(flat.map((cat) => [cat.id, cat]))

    const path: useGetCategoriesQueryResponseSuccess[] = []
    let current = byId.get(id) || null

    while (current) {
        path.push(current)
        if (current.parentID === null) break
        current = byId.get(current.parentID) || null
    }

    return path.reverse()
}


