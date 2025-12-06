interface Props {
    children: React.ReactNode
}
const Section = ({ children }: Props) => {
    return (
        <div
            className={
                "mx-auto my-3 max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-0"
            }
        >
            {children}
        </div>
    )
}

export default Section