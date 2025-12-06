const PostFormSkeleton = () => {
    const rows = Array.from({ length: 6 })

    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white px-8 py-6">
            <div className="mb-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                    <div className="h-3 w-32 rounded bg-gray-200" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {rows.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between gap-6"
                    >
                        <div className="h-4 w-40 rounded bg-gray-200" />
                        <div className="h-10 flex-1 rounded-lg bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostFormSkeleton


