export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return { "error": error.message };
    return { "error": String(error) };
}