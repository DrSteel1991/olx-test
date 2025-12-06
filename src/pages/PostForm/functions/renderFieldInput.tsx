import type { ControllerRenderProps } from "react-hook-form"
import type { TFunction } from "i18next"
import EnumSelectField, {
    type EnumOption,
} from "@/ui/form/EnumSelectField"
import EnumMultipleChipsField, {
    type EnumChipOption,
} from "@/ui/form/EnumMultipleChipsField"
import TextOrNumberField from "@/ui/form/TextOrNumberField"
import type { FieldDefinition } from "./buildValidationSchema"

type FormValues = Record<string, unknown>

interface Params {
    field: FieldDefinition
    rhfField: ControllerRenderProps<FormValues, string>
    hasError: boolean
    isArabic: boolean
    t: TFunction<"postForm">
}

export const renderFieldInput = (params: Params) => {
    const { field, rhfField, hasError, isArabic, t } = params
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

        const options: EnumOption[] = rawOptions.map((choice) => ({
            id: choice.id,
            label: isArabic
                ? choice.label_l1 || choice.seoSlug?.ar || choice.label
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

            const placeholder = t(
                `fields.${field.attribute}.placeholder`,
                { defaultValue: field.name },
            )

            return (
                <EnumSelectField
                    options={options}
                    placeholder={placeholder}
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

    const placeholder = t(
        `fields.${field.attribute}.placeholder`,
        { defaultValue: field.name },
    )

    return (
        <TextOrNumberField
            type={inputType}
            placeholder={placeholder}
            value={rhfField.value as string | number | undefined}
            onChange={rhfField.onChange}
            hasError={hasError}
        />
    )
}


