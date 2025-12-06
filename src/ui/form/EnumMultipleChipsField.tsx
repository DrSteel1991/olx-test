export interface EnumChipOption {
    id: number | string
    label: string
}

interface Props {
    options: EnumChipOption[]
    mode?: "single" | "multiple"
    value?: Array<string | number>
    onChange?: (value: Array<string | number>) => void
    hasError?: boolean
}

const EnumMultipleChipsField = ({
    options,
    mode = "multiple",
    value,
    onChange,
}: Props) => {
    const selectedIds = value ?? []

    const handleClick = (id: string | number) => {
        let next: Array<string | number>

        if (mode === "single") {
            next = [id]
        } else {
            next = selectedIds.includes(id)
                ? selectedIds.filter((x) => x !== id)
                : [...selectedIds, id]
        }

        onChange?.(next)
    }

    return (
        <div className="flex flex-wrap gap-3">
            {options.map((option) => {
                const isSelected = selectedIds.includes(option.id)
                const baseClasses =
                    "rounded-full border px-5 py-2 text-sm transition-colors"
                const selectedClasses =
                    "border-transparent bg-[#e9fcff] text-gray-900"
                const unselectedClasses =
                    "border-gray-300 bg-white text-gray-800 hover:border-gray-400"

                return (
                    <button
                        key={option.id}
                        type="button"
                        className={
                            baseClasses +
                            " " +
                            (isSelected ? selectedClasses : unselectedClasses)
                        }
                        onClick={() => handleClick(option.id)}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}

export default EnumMultipleChipsField


