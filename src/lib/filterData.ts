export function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export function toFilterToken(value: string) {
  return value.trim().toLowerCase();
}

export function toFilterData(values: string | string[]) {
  const list = Array.isArray(values) ? values : [values];
  return list.map(toFilterToken).filter(Boolean).join("|");
}

export function toSearchData(values: Array<string | string[] | undefined>) {
  return values
    .flatMap((value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    })
    .join(" ")
    .toLowerCase();
}
