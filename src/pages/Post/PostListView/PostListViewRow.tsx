import Icon from "@/ui/Icon/Icon"

interface Props {
    label: string
    iconSrc?: string
    onClick?: () => void
    hasChildren?: boolean
    isSelected?: boolean
}

const PostListViewRow = ({ label, iconSrc, onClick, hasChildren, isSelected }: Props) => {
    const baseClasses =
        "flex items-center justify-between border-b border-gray-200 px-6 py-3 text-left hover:bg-[#e9fbff]"
    const selectedClasses = isSelected ? " bg-[#e9fbff]" : ""
    return (
        <button
            type="button"
            onClick={onClick}
            className={baseClasses + selectedClasses}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-none items-center justify-center">
                    {iconSrc && (
                        <img
                            className="object-contain"
                            src={iconSrc}
                            alt={label}
                        />
                    )}
                </div>
                <span className="text-sm font-medium text-gray-900">
                    {label}
                </span>
            </div>
            <div className="flex h-4 w-4 flex-none items-center justify-center">
                {hasChildren && <Icon name="chevronRight" fontSize="small" />}
            </div>
        </button>
    )
}

export default PostListViewRow


