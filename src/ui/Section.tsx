interface Props {
    children: React.ReactNode
}
const Section = ({ children }: Props) => {
    return (
        <div className={"ml-auto mr-auto mt-3 mb-3 max-w-7xl"}>
            {children}
        </div>
    )
}

export default Section