import { Controller, type Control } from "react-hook-form"
import { useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"

type FormValues = Record<string, unknown>

interface Props {
    control: Control<FormValues>
    name?: string
    maxImages?: number
}

const DEFAULT_MAX_IMAGES = 14

const PostFormImageUploadSection = ({
    control,
    name = "images",
    maxImages = DEFAULT_MAX_IMAGES,
}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { t } = useTranslation("postForm")
    const cells = useMemo(
        () => Array.from({ length: maxImages }, (_, index) => index),
        [maxImages],
    )

    const handleOpenFileDialog = () => {
        inputRef.current?.click()
    }

    return (
        <div className="mt-4 flex items-center justify-between gap-6">
            <div className="w-40 shrink-0 text-sm font-semibold text-gray-800">
                {t("image.label", { defaultValue: "Images" })}
            </div>

            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    const files = (field.value as File[] | undefined) ?? []

                    const handleFilesSelected = (
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        const selectedFiles = Array.from(
                            event.target.files ?? [],
                        ).filter(
                            (file) =>
                                file.type.startsWith("image/") ||
                                file.name.match(/\.(png|jpe?g|webp|gif|bmp)$/i),
                        )
                        if (!selectedFiles.length) return

                        const next = [...files, ...selectedFiles].slice(
                            0,
                            maxImages,
                        )
                        field.onChange(next)

                        event.target.value = ""
                    }

                    return (
                        <>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleFilesSelected}
                            />

                            <div className="flex flex-col gap-2 w-full">
                                <div className="grid grid-cols-8 gap-2 w-3xl">
                                    {cells.map((index) => {
                                        const file = files[index]
                                        const isNextAvailable =
                                            !file &&
                                            index === files.length

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={handleOpenFileDialog}
                                                className={`flex h-12 w-full items-center justify-center rounded-lg border text-gray-400 ${file
                                                    ? "border-gray-300 bg-gray-50"
                                                    : "border-dashed border-gray-300 bg-gray-50 hover:border-[#23a5e6] hover:bg-[#e9fbff]"
                                                    }`}
                                            >
                                                {file ? (
                                                    <img
                                                        src={
                                                            URL.createObjectURL(
                                                                file,
                                                            )
                                                        }
                                                        alt={file.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center gap-1">
                                                        {isNextAvailable ? (
                                                            <span className="text-2xl">
                                                                +
                                                            </span>
                                                        ) : (
                                                            <span className="text-xl">
                                                                📷
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {t("image.description")}
                                </p>
                            </div>

                        </>
                    )
                }}
            />
        </div>
    )
}

export default PostFormImageUploadSection



