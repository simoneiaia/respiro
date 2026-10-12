import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          soft: "#eff6ff",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        sage: {
          soft: "#eff6ff",
          50: "#f0f9ff",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        success: "#166534",
        info: "#1d4ed8",
        warning: "#b45309",
        danger: "#b91c1c",
        surface: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "500" }],
        "body-sm": ["0.875rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.65" }],
        h4: ["1rem", { lineHeight: "1.4", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        h2: ["1.5rem", { lineHeight: "1.25", fontWeight: "650" }],
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 28px rgba(15,23,42,0.06)",
        glow: "0 0 40px rgba(37,99,235,0.1)",
      },
      transitionDuration: {
        180: "180ms",
        240: "240ms",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.08), transparent)",
        "logo-grad": "linear-gradient(135deg, #38bdf8 0%, #2563eb 45%, #0d9488 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
