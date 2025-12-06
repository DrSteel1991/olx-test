import { formatLocation } from "@/modules/functions/Ads/formatLocation"
import { formatPrice } from "@/modules/functions/Ads/formatPrice"
import { formatRelativeTime } from "@/modules/functions/Ads/formatRelativeTime"
import PropertyAdsDescription from "@/modules/PropertyAds/PropertyAdsDescription"
import type { HomeAd } from "@/staticData/types"

interface Props {
    ad: HomeAd
}

const HomeAdCard = ({ ad }: Props) => {
    return (
        <div className="mx-2 sm:mx-0 flex h-full flex-col overflow-hidden border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="aspect-4/3 w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={ad.ad_image_url}
                    alt={ad.ad_title}
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 px-4 py-3">
                <span className="text-sm font-bold text-orange-500">
                    {formatPrice(ad.ad_price)}
                </span>

                <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {ad.ad_title}
                </p>

                {ad.ad_bedroom_count &&
                    ad.ad_bathroom_count &&
                    ad.ad_area &&
                    <PropertyAdsDescription bedCount={ad.ad_bedroom_count} bathroomCount={ad.ad_bathroom_count} area={ad.ad_area} />
                }

                <div className="text-xs text-gray-600">
                    {formatLocation({ en: ad.ad_location_name_en, ar: ad.ad_location_name_lc })}
                </div>

                <div className="text-xs text-gray-400">
                    {formatRelativeTime(ad.timestamp)}
                </div>
            </div>
        </div>
    )
}

export default HomeAdCard