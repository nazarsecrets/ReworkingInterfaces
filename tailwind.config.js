/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.08em" }],
        small: ["14px", { lineHeight: "20px" }],
        body: ["16px", { lineHeight: "24px" }],
        h3: ["20px", { lineHeight: "28px" }],
        h2: ["24px", { lineHeight: "32px", letterSpacing: "-0.01em" }],
        h1: ["32px", { lineHeight: "40px", letterSpacing: "-0.015em" }],
        display: ["56px", { lineHeight: "60px", letterSpacing: "-0.02em" }],
      },
      spacing: {
        // 4-based scale already covered by Tailwind defaults (1=4, 2=8, 3=12...).
        // Add a few semantic aliases.
        gutter: "48px",
        rail: "360px",
        nav: "80px",
      },
      borderRadius: {
        DEFAULT: "2px",
        md: "4px",
      },
    },
  },
  plugins: [],
};
