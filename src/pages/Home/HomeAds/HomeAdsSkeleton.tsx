import Section from "@/ui/Section"

const HomeAdCardSkeleton = () => {
    return (
        <div className="mx-2 sm:mx-0 flex h-full flex-col overflow-hidden border border-gray-200 bg-white">
            <div className="aspect-4/3 w-full bg-gray-200 animate-pulse" />
            <div className="flex flex-1 flex-col gap-3 px-4 py-3 animate-pulse">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
        </div>
    )
}

const HomeAdsSkeletonSection = () => {
    const items = Array.from({ length: 4 })

    return (
        <div className="flex flex-col gap-2">
            <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
            <div
                className="grid gap-x-4 gap-y-6
                           grid-cols-1
                           sm:grid-cols-2
                           md:grid-cols-3
                           xl:grid-cols-4"
            >
                {items.map((_, idx) => (
                    <HomeAdCardSkeleton key={idx} />
                ))}
            </div>
        </div>
    )
}

const HomeAdsSkeleton = () => {
    return (
        <Section>
            <div className="px-4 sm:px-0">
                <div className="flex flex-col gap-10">
                    <HomeAdsSkeletonSection />
                    <HomeAdsSkeletonSection />
                </div>
            </div>
        </Section>
    )
}

export default HomeAdsSkeleton


