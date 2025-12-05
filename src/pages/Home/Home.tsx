import HomeHeader from "./HomeHeader"
import Separator from "@/ui/Separator"
import HomeCategories from "./HomeCategories/HomeCategories"
import { initHomeI18n } from "./i18n"

initHomeI18n()

const Home = () => {
    return (
        <>
            <HomeHeader />
            <Separator />
            <HomeCategories />
        </>
    )
}

export default Home