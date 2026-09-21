export function isUnlocked(day: number, today: Date = new Date()): boolean {
    return today.getDay() >= day;
}

export function monthsElapsed(startDate: Date, countDay: number, today: Date = new Date()): number {
    let count = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());

    if (today.getDate() < countDay) count--;

    return Math.max(0, count);
}
