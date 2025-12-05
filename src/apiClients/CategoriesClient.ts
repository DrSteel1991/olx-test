import type { useGetCategoriesQueryResponseSuccess } from "@/queries/Categories/types";
import AxiosClient from "./AxiosClient";

const CategoriesClient = AxiosClient();

export const getCategories =
    async (): Promise<useGetCategoriesQueryResponseSuccess[]> => {
        const response =
            await CategoriesClient.get<useGetCategoriesQueryResponseSuccess[]>("/categories");
        return response.data;
    };
