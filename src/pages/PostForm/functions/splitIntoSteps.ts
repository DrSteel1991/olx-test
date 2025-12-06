import type { CategoryFieldConfig } from "@/queries/CategoryFields/types";

const PRICE_RELATED_ATTRIBUTES = [
    "price",
    "secondary_price",
    "price_type",
    "payment_option",
] as const

const isPriceRelated = (attribute: string) =>
    PRICE_RELATED_ATTRIBUTES.some((key) => attribute.includes(key))

export const splitIntoSteps = (
    categoryFields: CategoryFieldConfig["flatFields"] | undefined,
) => {
    const eligibleFields =
        categoryFields?.filter(
            (field) =>
                field.groupIndex !== null &&
                !field.roles.includes("exclude_from_post_an_ad"),
        ) ?? []

    const regularFields = eligibleFields.filter(
        (field) => !isPriceRelated(field.attribute),
    )
    const priceFields = eligibleFields.filter((field) =>
        isPriceRelated(field.attribute),
    )

    const steps: Record<number, CategoryFieldConfig["flatFields"]> = {}

    for (const field of regularFields) {
        if (field.groupIndex === null) continue
        const groupIndex = field.groupIndex
        if (!steps[groupIndex]) {
            steps[groupIndex] = []
        }
        steps[groupIndex].push(field)
    }

    if (priceFields.length > 0) {
        const existingStepIndexes = Object.keys(steps).map(Number)
        const priceStepIndex =
            existingStepIndexes.length > 0
                ? Math.max(...existingStepIndexes) + 1
                : 1

        steps[priceStepIndex] = priceFields
    }

    Object.values(steps).forEach((step) => {
        step.sort((a, b) => a.displayPriority - b.displayPriority)
    })

    return steps
}