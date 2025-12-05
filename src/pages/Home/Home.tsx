import HomeHeader from "./HomeHeader"
import Separator from "@/ui/Separator"
import HomeCategories from "./HomeCategories/HomeCategories"
import { initHomeI18n } from "./i18n"
import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import { groupAdsByCategory } from "./functions/GroupAdsByCategory"
import ads from "@/staticData/ads.json"
import HomeAds from "./HomeAds/HomeAds"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

initHomeI18n()

const Home = () => {
    const { data: categories } = useGetCategoriesQuery()
    const { i18n } = useTranslation("home")

    const groupedAds = useMemo(
        () => groupAdsByCategory(ads, categories, i18n.language),
        [categories, i18n.language],
    )
    return (
        <>
            <HomeHeader />
            <Separator />
            <HomeCategories categories={categories} />
            <HomeAds groupedAds={groupedAds} />
        </>
    )
}

export default Home