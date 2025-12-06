import AddIcon from "@mui/icons-material/Add"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SearchIcon from "@mui/icons-material/Search"

export const icons = {
    add: AddIcon,
    KeyboardBackspace: KeyboardBackspaceIcon,
    chevronRight: ChevronRightIcon,
    search: SearchIcon,
} as const

export type IconName = keyof typeof icons