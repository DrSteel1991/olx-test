import type { HomeAd } from "@/staticData/types"
import Section from "@/ui/Section"
import HomeAdsSection from "./HomeAdsSection"

interface Props {
    groupedAds: Record<string, HomeAd[]>
}

const HomeAds = ({ groupedAds }: Props) => {
    return (
        <Section>
            <div className="px-4 sm:px-0">
                <div className="flex flex-col gap-10">
                    {Object.entries(groupedAds).map(([categoryName, ads]) => (
                        <HomeAdsSection
                            key={categoryName}
                            categoryName={categoryName}
                            ads={ads}
                        />
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default HomeAds