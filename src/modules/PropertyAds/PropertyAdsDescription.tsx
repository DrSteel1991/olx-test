import AreaIcon from "@/modules/icons/AreaIcon"
import BathIcon from "@/modules/icons/BathIcon"
import BedIcon from "@/modules/icons/BedIcon"
import PropertyAdsDescriptionItem from "./PropertyAdsDescriptionItem"

interface Props {
    bedCount: string
    bathroomCount: number
    area: number
}

const PropertyAdsDescription = ({ bedCount, bathroomCount, area }: Props) => {
    return (
        <div className="flex items-center gap-2 text-xs text-gray-500">
            <PropertyAdsDescriptionItem icon={<BedIcon />} value={bedCount} />
            <PropertyAdsDescriptionItem icon={<BathIcon />} value={bathroomCount} />
            <PropertyAdsDescriptionItem icon={<AreaIcon />} value={area} />
        </div>
    )
}

export default PropertyAdsDescription