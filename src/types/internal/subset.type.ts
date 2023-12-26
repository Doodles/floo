// Enforce that all elements of T are in U
export type Subset<T, U> = T extends U ? T : never;
