

import type { SvgIconProps } from "@mui/material/SvgIcon"
import { icons, type IconName } from "./IconName"


interface Props extends SvgIconProps {
    name: IconName
}

const Icon = ({ name, ...props }: Props) => {
    const Component = icons[name]
    if (!Component) return null

    return <Component {...props} />
}

export default Icon