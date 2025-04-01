export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export function toCamelCase(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function insertAt<T>(arr: T[], index: number, value: T): T[] {
    return [...arr.slice(0, index), value, ...arr.slice(index)];
}