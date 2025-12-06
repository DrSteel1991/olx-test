import { useQuery } from "@tanstack/react-query";
import type { useGetCategoriesQueryResponseSuccess } from "./types";
import { getCategories } from "@/apiClients/CategoriesClient";

export const useGetCategoriesQuery = () => {
    const { data, isLoading, isFetching, error } =
        useQuery<useGetCategoriesQueryResponseSuccess[]>({
            queryKey: ["categories"],
            queryFn: () => getCategories(),
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
        });

    return { data, isLoading, isFetching, error };
};
