import type { useGetCategoryFieldsQueryResponseSuccess } from "@/queries/CategoryFields/types";
import AxiosClient from "./AxiosClient";

const CategoriesClient = AxiosClient();

export const getCategoryFields =
    async (categoryExternalID: string): Promise<useGetCategoryFieldsQueryResponseSuccess> => {
        const response =
            await CategoriesClient.get<useGetCategoryFieldsQueryResponseSuccess>(`/categoryFields?categoryExternalIDs=${categoryExternalID}&includeWithoutCategory=true&splitByCategoryIDs=true&flatChoices=true&groupChoicesBySection=true&flat=true`);
        return response.data;
    };
