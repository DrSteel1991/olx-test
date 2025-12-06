import { render, screen, fireEvent } from "@testing-library/react"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import PostListView from "./PostListView"

const makeCategory = (
    overrides: Partial<useGetCategoriesQueryResponseSuccess> = {},
): useGetCategoriesQueryResponseSuccess => ({
    id: 1,
    name: "Cars",
    name_l1: "سيارات",
    externalID: "cars",
    slug: "cars",
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
    ...overrides,
})

describe("PostListView", () => {
    it("renders root categories in the first column", () => {
        const categories: useGetCategoriesQueryResponseSuccess[] = [
            makeCategory({ id: 1, name: "Cars" }),
            makeCategory({ id: 2, name: "Properties", externalID: "props", slug: "properties" }),
        ]

        const handleSelectInColumn = jest.fn()
        const onLeafCategorySelected = jest.fn()

        render(
            <PostListView
                categories={categories}
                isArabic={false}
                selectedPath={[]}
                handleSelectInColumn={handleSelectInColumn}
                onLeafCategorySelected={onLeafCategorySelected}
            />,
        )

        expect(screen.getByText("Cars")).toBeInTheDocument()
        expect(screen.getByText("Properties")).toBeInTheDocument()
    })

    it("renders child categories in subsequent columns and handles clicks", () => {
        const categories: useGetCategoriesQueryResponseSuccess[] = [
            makeCategory({
                id: 1,
                name: "Cars",
                children: [
                    makeCategory({
                        id: 10,
                        name: "Sedan",
                        externalID: "sedan",
                        slug: "sedan",
                        parentID: 1,
                        children: [],
                    }),
                ],
            }),
        ]

        const handleSelectInColumn = jest.fn()
        const onLeafCategorySelected = jest.fn()

        render(
            <PostListView
                categories={categories}
                isArabic={false}
                selectedPath={[1]}
                handleSelectInColumn={handleSelectInColumn}
                onLeafCategorySelected={onLeafCategorySelected}
            />,
        )

        fireEvent.click(
            screen.getByRole("button", { name: /Cars Cars/ }),
        )
        expect(handleSelectInColumn).toHaveBeenCalledWith(0, 1)

        fireEvent.click(screen.getByRole("button", { name: "Sedan" }))
        expect(onLeafCategorySelected).toHaveBeenCalledWith("sedan", 10)
    })
})


