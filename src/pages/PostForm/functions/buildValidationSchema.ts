import * as yup from "yup"
import type { CategoryFieldConfig } from "@/queries/CategoryFields/types"

export type FieldDefinition = CategoryFieldConfig["flatFields"][number]

interface Messages {
    required: string
    number: string
}

export const buildValidationSchema = (
    fields: FieldDefinition[],
    messages: Messages,
) => {
    const shape: Record<string, yup.AnySchema> = {}

    for (const field of fields) {
        let schema: yup.AnySchema

        switch (field.valueType) {
            case "string":
                schema = yup.string()
                break
            case "float":
            case "int":
                schema = yup
                    .number()
                    .typeError(messages.number)
                break
            case "enum":
                if (field.filterType === "multiple_choice") {
                    schema = yup.array(yup.mixed<string | number>().defined())
                } else {
                    schema = yup.mixed<string | number>().nullable()
                }
                break
            case "enum_multiple":
                schema = yup.array(yup.mixed<string | number>())
                break
            default:
                schema = yup.mixed()
        }

        if (field.isMandatory) {
            schema = schema.required(messages.required)
        }

        shape[field.attribute] = schema
    }

    return yup.object().shape(shape)
}


