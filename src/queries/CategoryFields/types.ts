type ValueType = "enum" | "enum_multiple" | "float" | "int" | "string"

export interface EnumChoice {
    value: string
    label: string
    label_l1?: string
    slug?: string
    seoSlug?: {
        en: string
        ar: string
    }
    extraFields: Record<string, unknown>
    id: number
    displayPriority: number | null
    popularityRank: number
    roles: string[]
    parentID?: number
}

interface BaseField {
    id: number
    valueType: ValueType
    roles: string[]
    attribute: string
    categoryID: number | null
    groupIndex: number | null
    maxFieldFacetSize: number | null
    seoTitle: { en: string; ar: string }
    paaSection: unknown
    name: string
    filterType: "single_choice" | "multiple_choice" | "range"
    isMandatory: boolean
    state: "active" | "inactive"
    displayPriority: number
    titlePriority: number
    minValue: number | null
    maxValue: number | null
    minLength: number | null
    maxLength: number | null
    pathPriority?: number
}

interface EnumField extends BaseField {
    valueType: "enum" | "enum_multiple"
    choices: EnumChoice[] | Record<string, EnumChoice[]>
}

interface NumericField extends BaseField {
    valueType: "float" | "int"
}

interface StringField extends BaseField {
    valueType: "string"
}

type FieldDefinition = EnumField | NumericField | StringField

export interface CategoryFieldConfig {
    flatFields: FieldDefinition[]
    childrenFields: FieldDefinition[]
    parentFieldLookup?: Record<string, string>
}

export type CategoryFieldsResponse<TCategoryId extends string = string> =
    Record<TCategoryId, CategoryFieldConfig> & {
        common_category_fields: CategoryFieldConfig
    }

export type useGetCategoryFieldsQueryResponseSuccess =
    CategoryFieldsResponse<string>