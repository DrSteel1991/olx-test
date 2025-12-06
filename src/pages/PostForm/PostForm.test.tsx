import { render, screen } from "@testing-library/react"
import PostForm from "./PostForm"

const mockNavigate = jest.fn()
const mockGetQueryData = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

jest.mock("@tanstack/react-query", () => {
    const actual = jest.requireActual("@tanstack/react-query")
    return {
        ...actual,
        useQueryClient: () => ({
            getQueryData: mockGetQueryData,
        }),
    }
})

jest.mock("@/queries/Categories/useGetCategoriesQuery", () => ({
    useGetCategoriesQuery: () => ({
        data: [
            {
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
            },
        ],
    }),
}))

jest.mock("@/queries/CategoryFields/useGetCategoryFieldsQuery", () => ({
    usePrefetchCategoryFields: () => ({
        prefetchCategoryFields: jest.fn(),
    }),
    CURRENT_CATEGORY_EXTERNAL_ID_KEY: "currentCategoryExternalID",
    CURRENT_CATEGORY_ID_KEY: "currentCategoryId",
}))

jest.mock("./functions/getCategoryFields", () => ({
    getCategoryFields: () => ({}),
}))

jest.mock("./hooks/useGetSteps", () => ({
    useGetSteps: () => ({
        steps: {},
        allVisibleFields: [],
    }),
}))

jest.mock("./hooks/useGetParentCategory", () => ({
    useGetParentCategory: () => ({
        parentName: "Cars",
        leafName: "Sedan",
        parentImageSrc: "/image.png",
    }),
}))

describe("PostForm", () => {
    beforeEach(() => {
        mockNavigate.mockReset()
        mockGetQueryData.mockReset()
        mockGetQueryData.mockReturnValue(undefined)
    })

    it("renders the post form header and submit button", () => {
        render(<PostForm />)

        expect(screen.getByText("Sell your ad")).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: "Submit" }),
        ).toBeInTheDocument()
    })
})


