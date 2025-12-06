import type {
    CategoryFieldConfig,
    useGetCategoryFieldsQueryResponseSuccess,
} from "@/queries/CategoryFields/types"
import type { FieldDefinition } from "@/pages/PostForm/functions/buildValidationSchema"
import { splitIntoSteps } from "@/pages/PostForm/functions/splitIntoSteps"

interface Result {
    steps: Record<string, FieldDefinition[]>
    allVisibleFields: FieldDefinition[]
}

export const useGetSteps = (
    categoryFields:
        | useGetCategoryFieldsQueryResponseSuccess
        | undefined,
    currentCategoryId: number | undefined,
): Result => {
    const currentCategoryKey =
        currentCategoryId !== undefined ? String(currentCategoryId) : undefined

    const currentCategoryConfig: CategoryFieldConfig | undefined =
        currentCategoryKey && categoryFields
            ? categoryFields[currentCategoryKey]
            : undefined

    const steps = splitIntoSteps(currentCategoryConfig?.flatFields)
    const allVisibleFields: FieldDefinition[] = Object.values(steps).flat()

    return { steps, allVisibleFields }
}


