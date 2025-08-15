export function isEmptyString(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

export function isValidURL(str: string | null | undefined): boolean {
  if (!str) return false;
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
