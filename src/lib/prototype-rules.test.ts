import { describe, expect, test } from "vitest";
import { getBirthYears, getBirthDayCount, getRecommendations, isBirthComplete, shuffle, validatePhoto } from "./prototype-rules";

describe("prototype input rules", () => {
  test("birth years include the current year", () => {
    expect(getBirthYears(2026)[0]).toBe(2026);
    expect(getBirthYears(2026)).toHaveLength(100);
  });
  test("solar month lengths account for leap years", () => {
    expect(getBirthDayCount("2024", "2", "solar")).toBe(29);
    expect(getBirthDayCount("2026", "2", "solar")).toBe(28);
    expect(getBirthDayCount("2026", "4", "solar")).toBe(30);
  });
  test("lunar input allows at most 30 days without claiming conversion", () => {
    expect(getBirthDayCount("2026", "2", "lunar")).toBe(30);
  });
  test("photo input rejects unsupported, empty and oversized files", () => {
    expect(validatePhoto({ type: "text/plain", size: 100 })).not.toBeNull();
    expect(validatePhoto({ type: "image/png", size: 0 })).not.toBeNull();
    expect(validatePhoto({ type: "image/jpeg", size: 10 * 1024 * 1024 + 1 })).not.toBeNull();
    expect(validatePhoto({ type: "image/jpeg", size: 10 * 1024 * 1024 })).toBeNull();
  });
});

describe("emotional recommendation count", () => {
  test("minimum is 4", () => {
    expect(getRecommendations(1)).toHaveLength(4);
  });
  test("maximum is 8", () => {
    expect(getRecommendations(99)).toHaveLength(8);
  });
  test("each count from 4 through 8 is supported", () => {
    for (const count of [4, 5, 6, 7, 8]) expect(getRecommendations(count)).toHaveLength(count);
  });
});

describe("birth completeness", () => {
  test("requires year, month, day and hour", () => {
    expect(isBirthComplete({ year: "1990", month: "5", day: "15", hour: "07-09" })).toBe(true);
    expect(isBirthComplete({ year: "1990", month: "5", day: "15" })).toBe(false);
    expect(isBirthComplete({})).toBe(false);
  });
  test("unknown birth hour is accepted as an explicit choice", () => {
    expect(isBirthComplete({ year: "1990", month: "5", day: "15", hour: "unknown" })).toBe(true);
  });
});

describe("shuffle", () => {
  test("keeps every item and does not mutate the input", () => {
    const source = [1, 2, 3, 4, 5];
    const result = shuffle(source);
    expect([...result].sort()).toEqual(source);
    expect(source).toEqual([1, 2, 3, 4, 5]);
  });
  test("is deterministic for a fixed random source", () => {
    expect(shuffle([1, 2, 3], () => 0)).toEqual([2, 3, 1]);
  });
});
