

export default function isExpired(date: Date): boolean {
    return date.getTime() < new Date().getTime()
}