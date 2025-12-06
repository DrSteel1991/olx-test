import { render, screen, fireEvent } from "@testing-library/react"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import PostCardView from "./PostCardView"

const makeCategory = (
    id: number,
    name: string,
    name_l1?: string,
): useGetCategoriesQueryResponseSuccess => ({
    id,
    name,
    name_l1: name_l1 ?? name,
    externalID: String(id),
    slug: `slug-${id}`,
    level: 0,
    parentID: null,
    displayPriority: 0,
    purpose: "for-sale",
    roles: [],
    locationDepthLimits: { min: 0, max: 0 },
    configurations: {},
    statistics: { activeCount: 0 },
    paaSections: null,
    templateConfigs: null,
    templateHashes: null,
    children: [],
})

describe("PostCardView", () => {
    it("renders a card for each category", () => {
        const categories = [
            makeCategory(1, "Cars"),
            makeCategory(2, "Properties"),
        ]
        const handleShowListView = jest.fn()

        render(
            <PostCardView
                categories={categories}
                isArabic={false}
                handleShowListView={handleShowListView}
            />,
        )

        expect(screen.getByText("Cars")).toBeInTheDocument()
        expect(screen.getByText("Properties")).toBeInTheDocument()
    })

    it("calls handleShowListView with category id when a card is clicked", () => {
        const categories = [makeCategory(1, "Cars")]
        const handleShowListView = jest.fn()

        const { container } = render(
            <PostCardView
                categories={categories}
                isArabic={false}
                handleShowListView={handleShowListView}
            />,
        )

        const button = container.querySelector("button")
        expect(button).not.toBeNull()
        if (button) {
            fireEvent.click(button)
        }

        expect(handleShowListView).toHaveBeenCalledWith(1)
    })
})

