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
            <div className="mb-10">
                <span className="text-2xl font-bold">
                    {t("categories.title")}
                </span>
            </div>
            <div className="mb-16 grid grid-cols-7 gap-x-26 gap-y-[1.6rem]">
                {categories?.map((category) => {
                    const isArabic = i18n.language === "ar"
                    const displayName = isArabic
                        ? category.name_l1
                        : category.name

                    return (
                        <HomeCategory key={category.id} slug={category.slug} displayName={displayName} />
                    )
                })}
            </div>
        </Section>
    )
}

export default HomeCategories