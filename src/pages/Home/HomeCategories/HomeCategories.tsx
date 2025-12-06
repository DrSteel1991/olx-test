import Section from "@/ui/Section"
import { useTranslation } from "react-i18next"
import HomeCategory from "./HomeCategory"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"

interface Props {
    categories: useGetCategoriesQueryResponseSuccess[] | undefined
}

const HomeCategories = ({ categories }: Props) => {

    const { t, i18n } = useTranslation("home")

    return (
        <Section>
            <div className="px-4 sm:px-0">
                <div className="mb-8 sm:mb-10">
                    <span className="text-xl font-bold sm:text-2xl">
                        {t("categories.title")}
                    </span>
                </div>
                <div
                    className="mb-16 grid grid-cols-2 gap-x-4 gap-y-6
                               sm:grid-cols-3 sm:gap-x-6
                               md:grid-cols-4
                               lg:grid-cols-6 lg:gap-x-10
                               xl:grid-cols-7 xl:gap-x-26"
                >
                    {categories?.map((category) => {
                        const isArabic = i18n.language === "ar"
                        const displayName = isArabic
                            ? category.name_l1
                            : category.name

                        return (
                            <HomeCategory
                                key={category.id}
                                slug={category.slug}
                                displayName={displayName}
                            />
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}

export default HomeCategories