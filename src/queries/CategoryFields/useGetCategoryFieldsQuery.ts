import { useQueryClient } from "@tanstack/react-query";
import { getCategoryFields } from "@/apiClients/CategoryFieldsClient";


export const CATEGORY_FIELDS_QUERY_KEY = "categoryFields" as const;
export const CURRENT_CATEGORY_EXTERNAL_ID_KEY = "currentCategoryExternalID" as const;
export const CURRENT_CATEGORY_ID_KEY = "currentCategoryId" as const;

export const usePrefetchCategoryFields = () => {
    const queryClient = useQueryClient();

    const prefetchCategoryFields = async (categoryExternalID: string, categoryId: number) => {
        await queryClient.prefetchQuery({
            queryKey: [CATEGORY_FIELDS_QUERY_KEY, categoryExternalID],
            queryFn: () => getCategoryFields(categoryExternalID),
        });

        queryClient.setQueryData([CURRENT_CATEGORY_EXTERNAL_ID_KEY], categoryExternalID);
        queryClient.setQueryData([CURRENT_CATEGORY_ID_KEY], categoryId);
    };

    return { prefetchCategoryFields };
};
