import Section from "@/ui/Section"

const PostCategoriesSkeleton = () => {
    const items = Array.from({ length: 6 })

    return (
        <Section>
            <div className="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-3">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        className="h-32 rounded-lg border border-gray-200 bg-gray-100 animate-pulse"
                    />
                ))}
            </div>
        </Section>
    )
}

export default PostCategoriesSkeleton


