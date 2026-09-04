const shortDateFormatter = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long" });
const fullDateFormatter = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" });

export function formatShortDate(dateString: string): string {
    const date = new Date(dateString + "T00:00:00");
    return shortDateFormatter.format(date);
}

export function formatFullDate(dateString: string): string {
    const date = new Date(dateString + "T00:00:00");
    return fullDateFormatter.format(date);
}
