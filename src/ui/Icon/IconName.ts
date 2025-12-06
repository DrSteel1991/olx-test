import AddIcon from "@mui/icons-material/Add"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import SearchIcon from "@mui/icons-material/Search"
import PlaceIcon from "@mui/icons-material/Place"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonIcon from "@mui/icons-material/Person"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export const icons = {
    add: AddIcon,
    ArrowBackIcon: ArrowBackIcon,
    ArrowForwardIcon: ArrowForwardIcon,
    chevronRight: ChevronRightIcon,
    search: SearchIcon,
    place: PlaceIcon,
    chatBubbleOutline: ChatBubbleOutlineIcon,
    notificationsNone: NotificationsNoneIcon,
    person: PersonIcon,
    expandMore: ExpandMoreIcon,
} as const

export type IconName = keyof typeof icons