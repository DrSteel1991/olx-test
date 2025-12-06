import { render, screen } from "@testing-library/react"
import { initHomeI18n } from "@/pages/Home/i18n"
import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types"
import HomeCategories from "./HomeCategories"

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

describe("HomeCategories", () => {
    beforeAll(() => {
        initHomeI18n()
    })

    it("renders the categories title from translations", () => {
        const categories = [makeCategory(1, "Cars")]
        render(<HomeCategories categories={categories} />)

        expect(screen.getByText("All categories")).toBeInTheDocument()
    })

    it("renders category names based on current language", () => {
        const categories = [
            makeCategory(1, "Cars", "سيارات"),
            makeCategory(2, "Mobile Phones", "هواتف"),
        ]

        render(<HomeCategories categories={categories} />)

        expect(screen.getByText("Cars")).toBeInTheDocument()
        expect(screen.getByText("Mobile Phones")).toBeInTheDocument()
    })
})

