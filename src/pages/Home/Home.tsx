import Section from "@/ui/Section"
import HomeHeader from "./HomeHeader"
import Separator from "@/ui/Separator"
import HomeCategories from "./HomeCategories/HomeCategories"

const Home = () => {
    return (
        <>
            <Section>
                <HomeHeader />
            </Section>
            <Separator />
            <HomeCategories />
        </>
    )
}

export default Home