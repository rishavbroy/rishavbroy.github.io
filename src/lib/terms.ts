export const PRESENT_TERM_KEY = "present";
export const PRESENT_TERM_VALUE = 999999;

const termNames = ["Spring", "Summer", "Fall"] as const;
const termSlugs = ["spring", "summer", "fall"] as const;

type TermSlug = (typeof termSlugs)[number];

function isTermSlug(value: string): value is TermSlug {
  return (termSlugs as readonly string[]).includes(value);
}

export interface TimelinePoint {
  label: string;
  value: number;
}

export interface PeriodRange {
  label: string;
  start: string;
  end: string;
}

export function getTermValue(termKey: string) {
  if (termKey === PRESENT_TERM_KEY) return PRESENT_TERM_VALUE;

  const match = /^(\d{4})-(spring|summer|fall)$/.exec(termKey);
  if (!match) {
    throw new Error(`Invalid term key "${termKey}". Use "YYYY-spring", "YYYY-summer", "YYYY-fall", or "present".`);
  }

  const year = Number(match[1]);
  const termIndex = termSlugs.indexOf(match[2] as TermSlug);
  return year * 3 + termIndex;
}

export function getPeriodValues(period: PeriodRange) {
  return {
    start: getTermValue(period.start),
    end: getTermValue(period.end)
  };
}

function termKeyFromValue(value: number) {
  const year = Math.floor(value / 3);
  const termIndex = value % 3;
  return `${year}-${termSlugs[termIndex]}`;
}

function labelFromTermKey(termKey: string) {
  if (termKey === PRESENT_TERM_KEY) return "Present";

  const [year, term] = termKey.split("-");
  if (!isTermSlug(term)) {
    throw new Error(`Invalid term key "${termKey}".`);
  }

  return `${termNames[termSlugs.indexOf(term)]} ${year}`;
}

export function buildTimelinePoints(periods: PeriodRange[]): TimelinePoint[] {
  const values = periods.flatMap((period) => [period.start, period.end]).map(getTermValue);
  const concreteValues = values.filter((value) => value !== PRESENT_TERM_VALUE);
  const includesPresent = values.includes(PRESENT_TERM_VALUE);

  if (concreteValues.length === 0) {
    return includesPresent ? [{ label: "Present", value: PRESENT_TERM_VALUE }] : [];
  }

  const min = Math.min(...concreteValues);
  const max = Math.max(...concreteValues);
  const points: TimelinePoint[] = [];

  for (let value = min; value <= max; value += 1) {
    const key = termKeyFromValue(value);
    points.push({ label: labelFromTermKey(key), value });
  }

  if (includesPresent) {
    points.push({ label: "Present", value: PRESENT_TERM_VALUE });
  }

  return points;
}
