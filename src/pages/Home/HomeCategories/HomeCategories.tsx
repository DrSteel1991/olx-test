import { useGetCategoriesQuery } from "@/queries/Categories/useGetCategoriesQuery"
import Section from "@/ui/Section"

const HomeCategories = () => {
    const { data: categories } = useGetCategoriesQuery()
    return (
        <Section>
            <div className="mb-10">
                <span className="text-2xl font-bold">All categories</span>
            </div>
            <div className="grid grid-cols-7 gap-x-26 gap-y-[1.6rem] mb-16">
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        className="flex w-34 flex-col items-center gap-3"
                    >
                        <img
                            className="h-23 w-23"
                            src={`/assets/images/categories/${category.slug}.png`}
                            alt={category.name}
                        />
                        <div className="flex flex-col items-center">
                            <span className="text-center text-sm font-semibold leading-tight">
                                {category.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}

export default HomeCategories