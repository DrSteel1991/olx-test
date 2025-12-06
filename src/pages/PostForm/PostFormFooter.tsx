import { useTranslation } from "react-i18next"

interface Props {
    onSubmit: () => void
}

const PostFormFooter = ({ onSubmit }: Props) => {
    const { t } = useTranslation("postForm")

    return (
        <div className="mt-6 flex justify-end">
            <button
                type="button"
                onClick={onSubmit}
                className="rounded-lg bg-[#002f34] px-6 py-2 text-sm font-semibold text-white hover:bg-[#003f45]"
            >
                {t("actions.submit")}
            </button>
        </div>
    )
}

export default PostFormFooter


