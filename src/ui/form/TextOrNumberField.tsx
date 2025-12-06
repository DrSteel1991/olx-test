interface Props {
    type: "text" | "number"
    placeholder: string
    value?: string | number | undefined
    onChange?: (value: string | number) => void
    hasError?: boolean
}

const TextOrNumberField = ({
    type,
    placeholder,
    value,
    onChange,
    hasError = false,
}: Props) => {
    const baseClasses =
        "w-full rounded-lg border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2"
    const normalClasses =
        "border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-[#23e5db]"
    const errorClasses =
        "border-red-500 text-red-600 placeholder:text-red-300 focus:ring-red-500"

    return (
        <input
            type={type}
            className={
                baseClasses + " " + (hasError ? errorClasses : normalClasses)
            }
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e) =>
                onChange?.(
                    type === "number" ? Number(e.target.value) : e.target.value,
                )
            }
        />
    )
}

export default TextOrNumberField


