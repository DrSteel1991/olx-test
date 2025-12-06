import type { useGetCategoryFieldsQueryResponseSuccess } from "@/queries/CategoryFields/types"
import {
    CATEGORY_FIELDS_QUERY_KEY,
    CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    CURRENT_CATEGORY_ID_KEY,
} from "@/queries/CategoryFields/useGetCategoryFieldsQuery"
import { useQueryClient } from "@tanstack/react-query"
import { splitIntoSteps } from "./functions/splitIntoSteps"
import Section from "@/ui/Section"
import { useTranslation } from "react-i18next"
import EnumSelectField, {
    type EnumOption,
} from "@/ui/form/EnumSelectField"
import EnumMultipleChipsField, {
    type EnumChipOption,
} from "@/ui/form/EnumMultipleChipsField"
import TextOrNumberField from "@/ui/form/TextOrNumberField"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, Controller, type ControllerRenderProps } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    buildValidationSchema,
    type FieldDefinition,
} from "./functions/buildValidationSchema"

const PostForm = () => {
    const { i18n } = useTranslation()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
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

    const currentCategoryKey =
        currentCategoryId !== undefined ? String(currentCategoryId) : undefined

    const currentCategoryConfig = currentCategoryKey
        ? categoryFields?.[currentCategoryKey]
        : undefined

    const steps = splitIntoSteps(currentCategoryConfig?.flatFields)

    const allVisibleFields: FieldDefinition[] = Object.values(steps).flat()

    const validationSchema = buildValidationSchema(allVisibleFields)

    type FormValues = Record<string, unknown>

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema as never),
        mode: "onBlur",
    })

    const { control, handleSubmit, formState } = form

    const onSubmit = (data: FormValues) => {
        console.log("Post form submit", data)
    }

    const renderFieldInput = (
        field: FieldDefinition,
        rhfField: ControllerRenderProps<Record<string, unknown>, string>,
        hasError: boolean,
    ) => {
        if (field.valueType === "enum" || field.valueType === "enum_multiple") {
            const enumField = field as Extract<
                FieldDefinition,
                { valueType: "enum" | "enum_multiple" }
            >
            const rawChoices = enumField.choices

            const rawOptions = !rawChoices
                ? []
                : Array.isArray(rawChoices)
                    ? rawChoices
                    : Object.values(rawChoices).flat()

            const isArabic = i18n.language === "ar"

            const options: EnumOption[] = rawOptions.map((choice) => ({
                id: choice.id,
                label:
                    isArabic && "label_l1" in choice && choice.label_l1
                        ? choice.label_l1
                        : choice.label,
            }))

            if (
                field.valueType === "enum" &&
                field.filterType === "multiple_choice" &&
                options.length <= 3
            ) {
                const chipOptions: EnumChipOption[] = options.map((option) => ({
                    id: option.id,
                    label: option.label,
                }))

                return (
                    <EnumMultipleChipsField
                        options={chipOptions}
                        mode="single"
                        value={
                            Array.isArray(rhfField.value)
                                ? (rhfField.value as Array<string | number>)
                                : []
                        }
                        onChange={rhfField.onChange}
                        hasError={hasError}
                    />
                )
            }

            if (field.valueType === "enum") {
                const currentArray = Array.isArray(rhfField.value)
                    ? (rhfField.value as Array<string | number>)
                    : rhfField.value == null
                        ? []
                        : [rhfField.value as string | number]

                const selectedValue =
                    currentArray.length > 0 ? currentArray[0] : null

                return (
                    <EnumSelectField
                        options={options}
                        placeholder={field.name}
                        value={selectedValue}
                        onChange={(val) => {
                            const nextArray =
                                val == null ? [] : [val as string | number]
                            rhfField.onChange(nextArray)
                        }}
                        hasError={hasError}
                    />
                )
            }

            const chipOptions: EnumChipOption[] = options.map((option) => ({
                id: option.id,
                label: option.label,
            }))

            return (
                <EnumMultipleChipsField
                    options={chipOptions}
                    mode="multiple"
                    value={
                        Array.isArray(rhfField.value)
                            ? (rhfField.value as Array<string | number>)
                            : []
                    }
                    onChange={rhfField.onChange}
                    hasError={hasError}
                />
            )
        }

        const inputType = field.valueType === "string" ? "text" : "number"

        return (
            <TextOrNumberField
                type={inputType}
                placeholder={field.name}
                value={rhfField.value as string | number | undefined}
                onChange={rhfField.onChange}
                hasError={hasError}
            />
        )
    }

    const isRtl = i18n.language === "ar"
    const labelAlign = isRtl ? "text-right" : "text-left"

    return (
        <Section>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-xl border border-gray-200 bg-white px-8 py-6"
                noValidate
            >
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
                                    <Controller
                                        key={field.id}
                                        control={control}
                                        name={field.attribute}
                                        render={({ field: rhfField, fieldState }) => {
                                            const showError =
                                                !!fieldState.error &&
                                                (fieldState.isTouched ||
                                                    formState.isSubmitted)

                                            return (
                                                <div className="flex items-start justify-between gap-6">
                                                    <div
                                                        className={`w-40 shrink-0 text-sm font-semibold ${showError
                                                            ? "text-red-500"
                                                            : "text-gray-800"
                                                            } ${labelAlign}`}
                                                    >
                                                        <span>{field.name}</span>
                                                        {field.isMandatory && (
                                                            <span className="ml-1 text-red-500">
                                                                *
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        {renderFieldInput(
                                                            field,
                                                            rhfField,
                                                            showError,
                                                        )}
                                                        {showError &&
                                                            fieldState.error?.message && (
                                                                <p className="mt-1 text-xs text-red-500">
                                                                    {fieldState.error.message}
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            )
                                        }}
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
                    Submit
                </button>
            </div>
        </Section>
    )
}

export default PostForm