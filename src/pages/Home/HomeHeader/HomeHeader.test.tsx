import { render, screen, fireEvent } from "@testing-library/react"
import { initHomeI18n } from "@/pages/Home/i18n"
import HomeHeader from "./HomeHeader"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

describe("HomeHeader", () => {
    beforeAll(() => {
        initHomeI18n()
    })

    beforeEach(() => {
        mockNavigate.mockClear()
    })

    it("renders language and sell buttons with correct labels", () => {
        render(<HomeHeader />)

        expect(
            screen.getByRole("button", { name: "العربية" }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: "Sell" }),
        ).toBeInTheDocument()
    })

    it("navigates to /post when sell button is clicked", () => {
        render(<HomeHeader />)

        const sellButton = screen.getByRole("button", { name: "Sell" })
        fireEvent.click(sellButton)

        expect(mockNavigate).toHaveBeenCalledWith("/post")
    })

    it("renders logo, location and search input", () => {
        render(<HomeHeader />)

        expect(screen.getByText(/lebanon/i)).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(/find cars, mobile phones and more/i),
        ).toBeInTheDocument()

        expect(screen.getByText(/sell/i)).toBeInTheDocument()
    })
})

