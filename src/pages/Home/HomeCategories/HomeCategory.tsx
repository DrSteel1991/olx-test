interface Props {
    slug: string
    displayName: string
}
const HomeCategory = ({ slug, displayName }: Props) => {
    return (
        <div
            className="flex w-34 flex-col items-center gap-3"
        >
            <img
                className="h-23 w-23"
                src={`/assets/images/categories/${slug}.png`}
                alt={displayName}
            />
            <div className="flex flex-col items-center">
                <span className="text-center text-sm font-semibold leading-tight">
                    {displayName}
                </span>
            </div>
        </div>
    )
}

export default HomeCategory