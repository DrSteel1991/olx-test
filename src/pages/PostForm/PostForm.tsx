import {
    CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    CURRENT_CATEGORY_ID_KEY,
    usePrefetchCategoryFields,
} from "@/queries/CategoryFields/useGetCategoryFieldsQuery"
import { useQueryClient } from "@tanstack/react-query"
import Section from "@/ui/Section"
import Header from "@/modules/Header/Header"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { buildValidationSchema, type FormValues } from "./functions/buildValidationSchema"
import * as yup from "yup"
import { initPostFormI18n } from "./i18n"
import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import CategorySelectDialog from "./PostFormCategorySelectDialog"
import PostFormBody from "./PostFormBody"
import PostFormFooter from "./PostFormFooter"
import PostFormSkeleton from "./PostFormSkeleton"
import PostFormHeader from "./PostFormHeader"
import { useGetSteps } from "./hooks/useGetSteps"
import { getCategoryFields } from "./functions/getCategoryFields"
import { useGetParentCategory } from "./hooks/useGetParentCategory"

initPostFormI18n()

const PostForm = () => {
    const { i18n, t } = useTranslation("postForm")
    const queryClient = useQueryClient()
    const { data: categories } = useGetCategoriesQuery()
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const navigate = useNavigate()
    const { prefetchCategoryFields } = usePrefetchCategoryFields()
    const currentCategoryExternalID = queryClient.getQueryData<string>([
        CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    ])

    const currentCategoryId = queryClient.getQueryData<number>([
        CURRENT_CATEGORY_ID_KEY,
    ])

    useEffect(() => {
        if (!currentCategoryExternalID || currentCategoryId === undefined) {
            navigate("/post")
        }
    }, [currentCategoryExternalID, currentCategoryId, navigate])

    const categoryFields = getCategoryFields(
        queryClient,
        currentCategoryExternalID,
    )

    const { steps, allVisibleFields } = useGetSteps(
        categoryFields,
        currentCategoryId,
    )

    const baseValidationSchema = buildValidationSchema(allVisibleFields, {
        required: t("errors.required"),
        number: t("errors.number"),
    })

    const validationSchema = baseValidationSchema.shape({
        contact_name: yup
            .string()
            .required(t("errors.required")),
        contact_mobile: yup
            .string()
            .required(t("errors.required")),
        contact_method: yup.string().nullable(),
    })

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema as never),
        mode: "onBlur",
    })

    const { control, handleSubmit } = form

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

    const handleShowCategoryModal = () => {
        setIsCategoryModalOpen(true)
    }

    const isRtl = i18n.language === "ar"
    const labelAlign = isRtl ? "text-right" : "text-left"

    const {
        parentName,
        leafName,
        parentImageSrc,
    } = useGetParentCategory(categories, currentCategoryId, isRtl)

    const handleFormSubmit = handleSubmit(onSubmit)

    const isFormLoading =
        !!currentCategoryExternalID && !categoryFields

    return (
        <>
            <Header navigationUrl="/post" />
            <Section>
                <PostFormHeader />
                {isFormLoading ? (
                    <PostFormSkeleton />
                ) : (
                    <>
                        <PostFormBody
                            parentName={parentName}
                            leafName={leafName}
                            parentImageSrc={parentImageSrc}
                            steps={steps}
                            control={control}
                            labelAlign={labelAlign}
                            isRtl={isRtl}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            handleShowCategoryModal={handleShowCategoryModal}
                        />

                        <PostFormFooter onSubmit={handleFormSubmit} />
                    </>
                )}
                <CategorySelectDialog
                    open={isCategoryModalOpen}
                    onClose={() => setIsCategoryModalOpen(false)}
                    onCategorySelected={handleCategorySelected}
                    categories={categories}
                    isArabic={isRtl}
                />
            </Section>
        </>
    )
}

export default PostForm