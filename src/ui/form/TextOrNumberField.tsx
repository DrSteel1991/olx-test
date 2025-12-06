interface Props {
    type: "text" | "number"
    placeholder: string
    value?: string | number | undefined
    onChange?: (value: string | number) => void
}

const TextOrNumberField = ({ type, placeholder, value, onChange }: Props) => {
    return (
        <input
            type={type}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#23e5db]"
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


