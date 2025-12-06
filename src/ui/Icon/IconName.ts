import AddIcon from "@mui/icons-material/Add"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from "@mui/icons-material/Search"

export const icons = {
    add: AddIcon,
    ArrowBackIcon: ArrowBackIcon,
    ArrowForwardIcon: ArrowForwardIcon,
    chevronRight: ChevronRightIcon,
    search: SearchIcon,
} as const

export type IconName = keyof typeof icons