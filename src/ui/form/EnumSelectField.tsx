import { useEffect, useRef, useState } from "react"
import Icon from "@/ui/Icon/Icon"

export interface EnumOption {
    id: number | string
    label: string
}

interface Props {
    options: EnumOption[]
    placeholder: string
    value?: string | number | null
    onChange?: (value: string | number | null) => void
}

const EnumSelectField = ({ options, placeholder, value, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                event.target instanceof Node &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const selected = options.find((option) => option.id === value)
    const displayLabel = selected ? selected.label : placeholder

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                className="flex w-full items-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm text-gray-500 hover:border-gray-400"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <Icon
                    name="search"
                    fontSize="small"
                    className="mr-3 text-gray-400"
                />
                    <span className="truncate">{displayLabel}</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => {
                                onChange?.(option.id)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EnumSelectField


