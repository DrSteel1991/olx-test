import type { QueryClient } from "@tanstack/react-query"
import type { useGetCategoryFieldsQueryResponseSuccess } from "@/queries/CategoryFields/types"
import { CATEGORY_FIELDS_QUERY_KEY } from "@/queries/CategoryFields/useGetCategoryFieldsQuery"

export const getCategoryFields = (
    queryClient: QueryClient,
    categoryExternalID: string | undefined,
): useGetCategoryFieldsQueryResponseSuccess | undefined => {
    if (!categoryExternalID) return undefined

    return queryClient.getQueryData<useGetCategoryFieldsQueryResponseSuccess>([
        CATEGORY_FIELDS_QUERY_KEY,
        categoryExternalID,
    ])
}


