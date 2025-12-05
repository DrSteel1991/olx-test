interface Props {
    icon: React.ReactNode
    value: string | number
}
const PropertyAdsDescriptionItem = ({ icon, value }: Props) => {
    return (
        <div className="flex items-center gap-1">
            {icon}
            <span className="font-medium">{value}</span>
        </div>
    )
}

export default PropertyAdsDescriptionItem