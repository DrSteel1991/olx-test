import Icon from "@/ui/Icon/Icon"

const HomeHeaderNotificationsButton = () => {
    return (
        <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        >
            <Icon
                name="notificationsNone"
                fontSize="medium"
                className="text-gray-700"
            />
        </button>
    )
}

export default HomeHeaderNotificationsButton


