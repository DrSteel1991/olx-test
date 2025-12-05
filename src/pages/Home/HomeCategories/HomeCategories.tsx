import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import Section from "@/ui/Section"
import { useTranslation } from "react-i18next"

const HomeCategories = () => {
    const { data: categories } = useGetCategoriesQuery()
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
                        <div
                            key={category.id}
                            className="flex w-34 flex-col items-center gap-3"
                        >
                            <img
                                className="h-23 w-23"
                                src={`/assets/images/categories/${category.slug}.png`}
                                alt={displayName}
                            />
                            <div className="flex flex-col items-center">
                                <span className="text-center text-sm font-semibold leading-tight">
                                    {displayName}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Section>
    )
}

export default HomeCategories