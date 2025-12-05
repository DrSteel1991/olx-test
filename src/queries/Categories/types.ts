export type LocationDepthLimits = {
    min: number;
    max: number;
};

export type Statistics = {
    activeCount: number;
};

export type Category = {
    id: number;
    name: string;
    name_l1: string;
    externalID: string;
    slug: string;
    level: number;
    parentID: number | null;
    displayPriority: number;
    purpose: "for-sale" | "for-rent";
    roles: string[];
    locationDepthLimits: LocationDepthLimits;
    configurations: Record<string, unknown>;
    statistics: Statistics;
    paaSections: unknown | null;
    templateConfigs: unknown | null;
    templateHashes: unknown | null;
    children: Category[];
};

export type useGetCategoriesQueryResponseSuccess = Category[];