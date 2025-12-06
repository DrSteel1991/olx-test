import type { HomeAd } from "@/staticData/types"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"

const flattenCategories = (
    categories: useGetCategoriesQueryResponseSuccess[],
): useGetCategoriesQueryResponseSuccess[] => {
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

export const groupAdsByCategory = (
    ads: HomeAd[],
    categories: useGetCategoriesQueryResponseSuccess[] | undefined,
    language: string,
) => {
    if (!categories || !categories.length) return {}

    const flatCategories = flattenCategories(categories)
    const categoryByExternalId = new Map(
        flatCategories.map((category) => [String(category.externalID), category]),
    )

    const groupedAds: Record<string, HomeAd[]> = {}

    for (const ad of ads) {
        const category = categoryByExternalId.get(
            String(ad.ad_category_external_id),
        )
        if (!category) continue

        const isArabic = language === "ar"
        const displayName =
            (isArabic ? category.name_l1 : category.name) ||
            category.name ||
            category.name_l1 ||
            String(category.id)

        if (!groupedAds[displayName]) {
            groupedAds[displayName] = []
        }

        groupedAds[displayName].push(ad)
    }

    return groupedAds
}

export const groupAdsByCategoryAsync = (
    ads: HomeAd[],
    categories: useGetCategoriesQueryResponseSuccess[] | undefined,
    language: string,
): Promise<Record<string, HomeAd[]>> => {
    // Wrap the synchronous computation in a Promise to mimic async retrieval
    return Promise.resolve(groupAdsByCategory(ads, categories, language))
}

