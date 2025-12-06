import { render, screen } from "@testing-library/react"
import type { HomeAd } from "@/staticData/types"
import HomeAds from "./HomeAds"

const makeAd = (overrides: Partial<HomeAd> = {}): HomeAd => ({
    facebook_browser_id: "fb",
    google_client_id: "g",
    client_ip: "127.0.0.1",
    client_device_id: "device",
    client_device_description: "desc",
    client_user_external_id: "user",
    client_session_id: "session",
    timestamp: Date.now(),
    app_type: "web",
    metric_entity: "ad",
    metric_source: "source",
    metric_action: "view",
    ad_image_url: "https://example.com/image.jpg",
    ad_location_l3_external_id: "loc3",
    ad_location_l3_name_en: "Location L3 EN",
    ad_location_l3_name_lc: "Location L3 AR",
    ad_location_external_id: "loc",
    ad_location_name_en: "Beirut",
    ad_location_name_lc: "بيروت",
    ad_agent_external_id: "agent",
    ad_agent_name: "Agent",
    ad_agency_external_id: "agency",
    ad_category_external_id: "1",
    ad_product: "product",
    ad_area: 120,
    ad_price: 100000,
    ad_bathroom_count: 2,
    ad_bedroom_count: "3",
    ad_title: "Nice Apartment",
    ad_source: "source",
    ad_type: "type",
    ad_external_id: "ad1",
    ad_source_id: 1,
    trace_id: "trace",
    ...overrides,
})

describe("HomeAds", () => {
    it("renders sections for each grouped category and their ads", () => {
        const groupedAds = {
            Apartments: [makeAd({ ad_title: "Apartment 1" })],
            Cars: [makeAd({ ad_title: "Car 1" })],
        }

        render(<HomeAds groupedAds={groupedAds} />)

        expect(screen.getByText("Apartments")).toBeInTheDocument()
        expect(screen.getByText("Cars")).toBeInTheDocument()
        expect(screen.getByText("Apartment 1")).toBeInTheDocument()
        expect(screen.getByText("Car 1")).toBeInTheDocument()
    })
})

