import { describe, expect, it } from "vitest";
import { formatRelativeDate } from "./format";

const NOW = new Date("2026-09-16T12:00:00Z");

describe("formatRelativeDate", () => {
  it("formata diferenças de poucos dias", () => {
    expect(formatRelativeDate("2026-09-13T12:00:00Z", NOW)).toBe("há 3 dias");
  });

  it("formata diferenças de semanas", () => {
    expect(formatRelativeDate("2026-09-02T12:00:00Z", NOW)).toBe("há 2 semanas");
  });

  it("formata diferenças de meses", () => {
    expect(formatRelativeDate("2026-06-16T12:00:00Z", NOW)).toBe("há 3 meses");
  });
});
