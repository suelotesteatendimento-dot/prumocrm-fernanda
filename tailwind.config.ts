import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "#c8b08a",
          2: "#6e675f",
          3: "#1a1a1a",
          4: "#e7d8c7",
          5: "#ede4da"
        },
        brand: {
          950: "#111111",
          900: "#1A1A1A",
          500: "#C8B08A",
          300: "#E7D8C7",
          200: "#EDE4DA",
          100: "#F7F3EE",
          600: "#6E675F"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 24px 55px -30px rgba(17, 17, 17, 0.22)",
        panel: "0 18px 40px -28px rgba(17, 17, 17, 0.18)"
      },
      backgroundImage: {
        "grain-gradient":
          "radial-gradient(circle at top, rgba(200, 176, 138, 0.22), transparent 38%), linear-gradient(135deg, rgba(247, 243, 238, 1), rgba(237, 228, 218, 0.86))"
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-inter)"]
      }
    }
  },
  plugins: []
};

export default config;
