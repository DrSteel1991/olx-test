import {
    Controller,
    useFormState,
    type Control,
    type ControllerRenderProps,
} from "react-hook-form"
import type { TFunction } from "i18next"
import type { FieldDefinition } from "./functions/buildValidationSchema"
import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"

type FormValues = Record<string, unknown>

interface Props {
    field: FieldDefinition
    control: Control<FormValues>
    labelAlign: string
    isArabic: boolean
    renderFieldInput: (params: {
        field: FieldDefinition
        rhfField: ControllerRenderProps<FormValues, string>
        hasError: boolean
        isArabic: boolean
        t: TFunction<"postForm">
    }) => ReactNode
}

const PostFormFieldRow = ({
    field,
    control,
    labelAlign,
    isArabic,
    renderFieldInput,
}: Props) => {
    const { t } = useTranslation("postForm")
    const { isSubmitted } = useFormState({ control })
    return (
        <Controller
            control={control}
            name={field.attribute}
            render={({ field: rhfField, fieldState }) => {
                const showError =
                    !!fieldState.error &&
                    (fieldState.isTouched || isSubmitted)

                const defaultLabel = isArabic
                    ? field.seoTitle?.ar || field.name
                    : field.seoTitle?.en || field.name

                return (
                    <div className="flex items-start justify-between gap-6">
                        <div
                            className={`w-40 shrink-0 text-sm font-semibold ${showError ? "text-red-500" : "text-gray-800"
                                } ${labelAlign}`}
                        >
                            <span>
                                {t(`fields.${field.attribute}.label`, {
                                    defaultValue: defaultLabel,
                                })}
                            </span>
                            {field.isMandatory && (
                                <span className="ml-1 text-red-500">*</span>
                            )}
                        </div>
                        <div className="flex-1">
                            {renderFieldInput({
                                field,
                                rhfField,
                                hasError: showError,
                                isArabic,
                                t,
                            })}
                            {showError && fieldState.error?.message && (
                                <p className="mt-1 text-xs text-red-500">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    </div>
                )
            }}
        />
    )
}

export default PostFormFieldRow


