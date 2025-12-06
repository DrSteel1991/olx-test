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
            <div
                className="grid gap-x-4 gap-y-6
                           grid-cols-1
                           sm:grid-cols-2
                           md:grid-cols-3
                           xl:grid-cols-4"
            >
                {ads.map((ad) => (
                    <HomeAdCard key={ad.ad_external_id} ad={ad} />
                ))}
            </div>
        </div>
    )
}

export default HomeAdsSection