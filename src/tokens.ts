// IU Canvas — design tokens
// Source of truth mirrored from Paper file: "IU Canvas — Tokens"

export const colors = {
  crimson: "#990000",
  ink: "#111111",
  slate: "#5C5C5C",
  rule: "#E5E5E5",
  paper: "#F5F5F2",
  page: "#FFFFFF",
  success: "#0A6B3B",
  warning: "#B45309",
  error: "#B00020",
  info: "#0B5FFF",
} as const;

export const type = {
  display: { size: 56, lineHeight: 60, weight: 700, tracking: "-0.02em" },
  h1: { size: 32, lineHeight: 40, weight: 700, tracking: "-0.015em" },
  h2: { size: 24, lineHeight: 32, weight: 700, tracking: "-0.01em" },
  h3: { size: 20, lineHeight: 28, weight: 600, tracking: "0" },
  body: { size: 16, lineHeight: 24, weight: 400, tracking: "0" },
  small: { size: 14, lineHeight: 20, weight: 400, tracking: "0" },
  caption: { size: 12, lineHeight: 16, weight: 500, tracking: "0.08em" },
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export type ColorToken = keyof typeof colors;
