import Icon from "./Icon/Icon"
import type { IconName } from "./Icon/IconName"

interface Props {
    label: string
    iconName?: string
    onClick?: () => void
}
const Button = ({ label, iconName, onClick }: Props) => {

    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-[#fcde68] text-black font-medium text-sm px-4 py-1 rounded-4xl cursor-pointer"
        >
            <div className="flex items-center gap-2">
                {iconName && <Icon name={iconName as IconName} />}
                {label}
            </div>
        </button >
    )
}

export default Button