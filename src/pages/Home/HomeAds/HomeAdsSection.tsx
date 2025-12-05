import type { HomeAd } from "@/staticData/types"
import HomeAdCard from "./HomeAdCard"

interface Props {
    categoryName: string
    ads: HomeAd[]
}

const HomeAdsSection = ({ categoryName, ads }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">{categoryName}</span>
            <div className="grid grid-cols-4 gap-x-6">
                {ads.map((ad) => (
                    <HomeAdCard key={ad.ad_external_id} ad={ad} />
                ))}
            </div>
        </div>
    )
}

export default HomeAdsSection