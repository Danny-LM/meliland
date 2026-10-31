export function normalizeAnswer(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s]/g, '')
		.replace(/\s+/g, ' ')
        .trim()
}

export function matchesAnswer(
    input: string,
    answers: string[],
    exact = false,
): boolean {
    const guess = normalizeAnswer(input);
    if (!guess) return false;

    return answers
        .map(normalizeAnswer)
        .filter(Boolean)
        .some((answers) => (exact ? guess === answers : guess.includes(answers)));
}
