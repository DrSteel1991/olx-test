import {
    Controller,
    useFormState,
    type Control,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import TextOrNumberField from "@/ui/form/TextOrNumberField"
import EnumMultipleChipsField, {
    type EnumChipOption,
} from "@/ui/form/EnumMultipleChipsField"

type FormValues = Record<string, unknown>

interface Props {
    control: Control<FormValues>
    labelAlign: string
}

const PostFormContactSection = ({ control, labelAlign }: Props) => {
    const { t } = useTranslation("postForm")
    const { isSubmitted } = useFormState({ control })

    const contactMethodOptions: EnumChipOption[] = [
        {
            id: "phone",
            label: t("contactMethod.options.phone", {
                defaultValue: "Phone Number",
            }),
        },
        {
            id: "chat",
            label: t("contactMethod.options.chat", {
                defaultValue: "OLX Chat",
            }),
        },
        {
            id: "both",
            label: t("contactMethod.options.both", {
                defaultValue: "Both",
            }),
        },
    ]

    return (
        <div className="mt-8 flex flex-col gap-4">
            {/* Name */}
            <Controller
                control={control}
                name="contact_name"
                render={({ field, fieldState }) => {
                    const showError =
                        !!fieldState.error &&
                        (fieldState.isTouched || isSubmitted)

                    return (
                        <div className="flex items-start justify-between gap-6">
                            <div
                                className={`w-40 shrink-0 text-sm font-semibold ${
                                    showError ? "text-red-500" : "text-gray-800"
                                } ${labelAlign}`}
                            >
                                <span>
                                    {t("contactMethod.name.label", {
                                        defaultValue: "Name",
                                    })}
                                </span>
                                <span className="ml-1 text-red-500">*</span>
                            </div>
                            <div className="flex-1">
                                <TextOrNumberField
                                    type="text"
                                    placeholder={t(
                                        "contactMethod.name.placeholder",
                                        { defaultValue: "Enter your name" },
                                    )}
                                    value={
                                        (field.value as string | undefined) ??
                                        ""
                                    }
                                    onChange={field.onChange}
                                    hasError={showError}
                                />
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

            {/* Mobile Phone Number */}
            <Controller
                control={control}
                name="contact_mobile"
                render={({ field, fieldState }) => {
                    const showError =
                        !!fieldState.error &&
                        (fieldState.isTouched || isSubmitted)

                    return (
                        <div className="flex items-start justify-between gap-6">
                            <div
                                className={`w-40 shrink-0 text-sm font-semibold ${
                                    showError ? "text-red-500" : "text-gray-800"
                                } ${labelAlign}`}
                            >
                                <span>
                                    {t("contactMethod.mobile.label", {
                                        defaultValue: "Mobile Phone Number",
                                    })}
                                </span>
                                <span className="ml-1 text-red-500">*</span>
                            </div>
                            <div className="flex-1">
                                <TextOrNumberField
                                    type="text"
                                    placeholder={t(
                                        "contactMethod.mobile.placeholder",
                                        {
                                            defaultValue:
                                                "Enter mobile phone number",
                                        },
                                    )}
                                    value={
                                        (field.value as string | undefined) ??
                                        ""
                                    }
                                    onChange={field.onChange}
                                    hasError={showError}
                                />
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

            {/* Contact Method */}
            <Controller
                control={control}
                name="contact_method"
                render={({ field, fieldState }) => {
                    const showError =
                        !!fieldState.error &&
                        (fieldState.isTouched || isSubmitted)

                    const valueArray = Array.isArray(field.value)
                        ? (field.value as Array<string | number>)
                        : field.value
                        ? [field.value as string | number]
                        : []

                    return (
                        <div className="flex items-start justify-between gap-6">
                            <div
                                className={`w-40 shrink-0 text-sm font-semibold ${
                                    showError ? "text-red-500" : "text-gray-800"
                                } ${labelAlign}`}
                            >
                                <span>
                                    {t("contactMethod.label", {
                                        defaultValue: "Contact Method",
                                    })}
                                </span>
                            </div>
                            <div className="flex-1">
                                <EnumMultipleChipsField
                                    options={contactMethodOptions}
                                    mode="single"
                                    value={valueArray}
                                    onChange={field.onChange}
                                    hasError={showError}
                                />
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
        </div>
    )
}

export default PostFormContactSection


