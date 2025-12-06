import type { Control, UseFormHandleSubmit } from "react-hook-form"
import PostFormCategorychangeField from "./PostFormCategoryChangeField"
import PostFormFieldRow from "./PostFormFieldRow"
import PostFormContactSection from "./PostFormContactSection"
import type { FieldDefinition } from "./functions/buildValidationSchema"
import { renderFieldInput } from "./functions/renderFieldInput"

type FormValues = Record<string, unknown>

interface Props {
    parentName: string
    leafName: string
    parentImageSrc?: string
    steps: Record<string, FieldDefinition[]>
    control: Control<FormValues>
    labelAlign: string
    isRtl: boolean
    handleSubmit: UseFormHandleSubmit<FormValues>
    onSubmit: (data: FormValues) => void
    handleShowCategoryModal: () => void
}

const PostFormBody = ({
    parentName,
    leafName,
    parentImageSrc,
    steps,
    control,
    labelAlign,
    isRtl,
    handleSubmit,
    onSubmit,
    handleShowCategoryModal,
}: Props) => {
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border border-gray-200 bg-white px-8 py-6"
            noValidate
        >
            <PostFormCategorychangeField
                parentName={parentName}
                leafName={leafName}
                parentImageSrc={parentImageSrc}
                onChangeClick={handleShowCategoryModal}
            />

            <div className="flex flex-col gap-6">
                {Object.entries(steps)
                    .sort(
                        ([stepA], [stepB]) =>
                            Number(stepA) - Number(stepB),
                    )
                    .map(([stepIndex, fields]) => (
                        <div
                            key={stepIndex}
                            className="flex flex-col gap-4"
                        >
                            {fields.map((field) => (
                                <PostFormFieldRow
                                    key={field.id}
                                    field={field}
                                    control={control}
                                    labelAlign={labelAlign}
                                    isArabic={isRtl}
                                    renderFieldInput={renderFieldInput}
                                />
                            ))}
                        </div>
                    ))}
            </div>

            <PostFormContactSection
                control={control}
                labelAlign={labelAlign}
            />
        </form>
    )
}

export default PostFormBody


