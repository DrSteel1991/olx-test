import Section from "@/ui/Section"

const HomeCategoriesSkeleton = () => {
    const items = Array.from({ length: 7 })

    return (
        <Section>
            <div className="px-4 sm:px-0">
                <div className="mb-8 sm:mb-10">
                    <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
                </div>
                <div
                    className="mb-16 grid grid-cols-2 gap-x-4 gap-y-6
                               sm:grid-cols-3 sm:gap-x-6
                               md:grid-cols-4
                               lg:grid-cols-6 lg:gap-x-10
                               xl:grid-cols-7 xl:gap-x-26"
                >
                    {items.map((_, idx) => (
                        <div
                            key={idx}
                            className="flex w-34 flex-col items-center gap-3 animate-pulse"
                        >
                            <div className="h-24 w-24 rounded-full bg-gray-200" />
                            <div className="h-3 w-20 rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default HomeCategoriesSkeleton


