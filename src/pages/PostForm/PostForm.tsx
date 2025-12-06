import type { useGetCategoryFieldsQueryResponseSuccess } from "@/queries/CategoryFields/types"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import {
    CATEGORY_FIELDS_QUERY_KEY,
    CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    CURRENT_CATEGORY_ID_KEY,
    usePrefetchCategoryFields,
} from "@/queries/CategoryFields/useGetCategoryFieldsQuery"
import { useQueryClient } from "@tanstack/react-query"
import Section from "@/ui/Section"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { buildValidationSchema } from "./functions/buildValidationSchema"
import { initPostFormI18n } from "./i18n"
import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import CategorySelectDialog from "./PostFormCategorySelectDialog"
import PostFormCategoryHeader from "./PostFormCategoryHeader"
import { renderFieldInput } from "./functions/renderFieldInput"
import PostFormFieldRow from "./PostFormFieldRow"
import { useGetSteps } from "./hooks/useGetSteps"

initPostFormI18n()

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

const getCategoryPathById = (
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

const PostForm = () => {
    const { i18n, t } = useTranslation("postForm")
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { data: categories } = useGetCategoriesQuery()
    const { prefetchCategoryFields } = usePrefetchCategoryFields()
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const currentCategoryExternalID = queryClient.getQueryData<string>([
        CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    ])

    const currentCategoryId = queryClient.getQueryData<number>([
        CURRENT_CATEGORY_ID_KEY,
    ])

    useEffect(() => {
        if (!currentCategoryExternalID || currentCategoryId === undefined) {
            navigate("/post", { replace: true })
        }
    }, [currentCategoryExternalID, currentCategoryId, navigate])

    let categoryFields: useGetCategoryFieldsQueryResponseSuccess | undefined
    if (currentCategoryExternalID) {
        categoryFields = queryClient.getQueryData<useGetCategoryFieldsQueryResponseSuccess>([
            CATEGORY_FIELDS_QUERY_KEY,
            currentCategoryExternalID,
        ])
    }

    const { steps, allVisibleFields } = useGetSteps(
        categoryFields,
        currentCategoryId,
    )

    const validationSchema = buildValidationSchema(allVisibleFields, {
        required: t("errors.required"),
        number: t("errors.number"),
    })

    type FormValues = Record<string, unknown>

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema as never),
        mode: "onBlur",
    })

    const { control, handleSubmit, formState } = form

    const onSubmit = (data: FormValues) => {
        console.log("Post form submit", data)
    }

    const handleCategorySelected = async (
        categoryExternalID: string,
        categoryId: number,
    ) => {
        await prefetchCategoryFields(categoryExternalID, categoryId)
        setIsCategoryModalOpen(false)
        navigate("/post-form", { replace: true })
    }

    const isRtl = i18n.language === "ar"
    const labelAlign = isRtl ? "text-right" : "text-left"

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

    return (
        <Section>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-xl border border-gray-200 bg-white px-8 py-6"
                noValidate
            >
                <PostFormCategoryHeader
                    parentName={parentName}
                    leafName={leafName}
                    parentImageSrc={parentImageSrc}
                    onChangeClick={() => setIsCategoryModalOpen(true)}
                />

                <div className="flex flex-col gap-6">
                    {Object.entries(steps)
                        .sort(
                            ([stepA], [stepB]) =>
                                Number(stepA) - Number(stepB),
                        )
                        .map(([stepIndex, fields]) => (
                            <div
                                key={stepIndex}
                                className="flex flex-col gap-4"
                            >
                                {fields.map((field) => (
                                    <PostFormFieldRow
                                        key={field.id}
                                        field={field}
                                        control={control}
                                        formState={formState}
                                        labelAlign={labelAlign}
                                        isArabic={isRtl}
                                        renderFieldInput={renderFieldInput}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </form>

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="rounded-lg bg-[#002f34] px-6 py-2 text-sm font-semibold text-white hover:bg-[#003f45]"
                >
                    {t("actions.submit")}
                </button>
            </div>

            <CategorySelectDialog
                open={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onCategorySelected={handleCategorySelected}
                categories={categories}
                isArabic={isRtl}
            />
        </Section>
    )
}

export default PostForm