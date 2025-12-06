import Button from "@/ui/Button"

interface Props {
    label: string
    onClick: () => void
}

const HomeHeaderSellButton = ({ label, onClick }: Props) => {
    return (
        <Button
            label={label}
            iconName="add"
            onClick={onClick}
        />
    )
}

export default HomeHeaderSellButton


