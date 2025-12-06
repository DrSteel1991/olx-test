import type { useGetCategoryFieldsQueryResponseSuccess } from "@/queries/CategoryFields/types"
import {
    CATEGORY_FIELDS_QUERY_KEY,
    CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    CURRENT_CATEGORY_ID_KEY,
} from "@/queries/CategoryFields/useGetCategoryFieldsQuery"
import { useQueryClient } from "@tanstack/react-query"
import { splitIntoSteps } from "./functions/splitIntoSteps"

const PostForm = () => {
    const queryClient = useQueryClient()
    const currentCategoryExternalID = queryClient.getQueryData<string>([
        CURRENT_CATEGORY_EXTERNAL_ID_KEY,
    ])

    const currentCategoryId = queryClient.getQueryData<number>([
        CURRENT_CATEGORY_ID_KEY,
    ])

    const categoryFields =
        currentCategoryExternalID &&
        queryClient.getQueryData<useGetCategoryFieldsQueryResponseSuccess>([
            CATEGORY_FIELDS_QUERY_KEY,
            currentCategoryExternalID,
        ])

    console.log("categoryFields", categoryFields)

    const steps = splitIntoSteps(categoryFields?.[currentCategoryId]?.flatFields)

    console.log("steps", steps)

    return (
        <div>
            <h1>Post Form</h1>
        </div>
    )
}

export default PostForm