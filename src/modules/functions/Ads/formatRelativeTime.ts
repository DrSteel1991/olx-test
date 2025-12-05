export const formatRelativeTime = (timestamp: number) => {
    const adDate = new Date(timestamp * 1000)
    const now = new Date()
    const diffMs = now.getTime() - adDate.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays <= 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    return `${diffDays} days ago`
}