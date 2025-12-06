import HomeHeader from "./HomeHeader"
import Separator from "@/ui/Separator"
import HomeCategories from "./HomeCategories/HomeCategories"
import HomeCategoriesSkeleton from "./HomeCategories/HomeCategoriesSkeleton"
import { initHomeI18n } from "./i18n"
import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import { groupAdsByCategoryAsync } from "./functions/GroupAdsByCategory"
import ads from "@/staticData/ads.json"
import HomeAds from "./HomeAds/HomeAds"
import HomeAdsSkeleton from "./HomeAds/HomeAdsSkeleton"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import type { HomeAd } from "@/staticData/types"

initHomeI18n()

const Home = () => {
    const { data: categories, isLoading, isFetching } = useGetCategoriesQuery()
    const { i18n } = useTranslation("home")

    const isLoadingCategories = isLoading || isFetching
    const [groupedAds, setGroupedAds] = useState<Record<string, HomeAd[]>>({})
    const [isAdsLoading, setIsAdsLoading] = useState(true)

    useEffect(() => {
        if (!categories || !categories.length) return

        let cancelled = false

        const loadAds = async () => {
            setIsAdsLoading(true)
            const result = await groupAdsByCategoryAsync(
                ads,
                categories,
                i18n.language,
            )
            if (!cancelled) {
                setGroupedAds(result)
                setIsAdsLoading(false)
            }
        }

        loadAds()

        return () => {
            cancelled = true
        }
    }, [categories, i18n.language])

    const showCategoriesSkeleton = isLoadingCategories
    const showAdsSkeleton = isAdsLoading
    return (
        <>
            <HomeHeader />
            <Separator />
            {showCategoriesSkeleton ? (
                <HomeCategoriesSkeleton />
            ) : (
                <HomeCategories categories={categories} />
            )}

            {showAdsSkeleton ? (
                <HomeAdsSkeleton />
            ) : (
                <HomeAds groupedAds={groupedAds} />
            )}
        </>
    )
}

export default Home