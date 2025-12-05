import AddIcon from "@mui/icons-material/Add"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

export const icons = {
    add: AddIcon,
    KeyboardBackspace: KeyboardBackspaceIcon,
    chevronRight: ChevronRightIcon,
} as const

export type IconName = keyof typeof icons