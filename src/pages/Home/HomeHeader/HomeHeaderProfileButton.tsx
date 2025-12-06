import Icon from "@/ui/Icon/Icon"

const HomeHeaderProfileButton = () => {
    return (
        <div className="flex items-center gap-1 rounded-full bg-[#ffe470] px-2 py-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                <Icon
                    name="person"
                    fontSize="small"
                    className="text-[#ffe470]"
                />
            </div>
            <Icon
                name="expandMore"
                fontSize="small"
                className="text-gray-800"
            />
        </div>
    )
}

export default HomeHeaderProfileButton


