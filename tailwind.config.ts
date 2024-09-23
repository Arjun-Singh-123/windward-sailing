import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media", // Enable dark mode using class
  // usage
  //   <div className="bg-lightBackground dark:bg-darkBackground">
  //   This div will have a light background in light mode and dark in dark mode.
  // </div>

  // extend: {
  //   colors: {
  //     // Define dark mode colors
  //     darkBackground: '#1a1a1a',
  //     lightBackground: '#ffffff',
  //   },
  // },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "great-vibes": ["Great Vibes", "cursive"],
      },
      backgroundImage: {
        logoIcon: "url('/images/favicon.ico')",
        footerIcon: "/images/logoo.png",
        "hero-pattern": "url('/img/hero-pattern.svg')",
        " gradient-to-br": "linear-gradient(to bottom right, #ff7e5f, #feb47b)",
      },
      colors: {
        sky: "var(--sky)",
        lightSky: "var(--lightSky)",
        black: "var(--black)",
        deepBlack: "var(--deepBlack)",
        flatBlue: "var(--flatBlue)",
        darkBlue: "var(--darkBlue)",
        fontColor: "var(--fontColor)",
        grayColor: "var(--grayColor)",
        white: "var(--white)",

        ceo: "var(--ceo)",
        admin: "var(--admin)",
        cfuser: "var(--cfuser)",
        buttonGrd1: "var(--buttonGrd1)",
        buttonGrd2: "var(--buttonGrd2)",
        blueGrd1: "var(--blueGrd1)",
        blueGrd2: "var(--blueGrd2)",
        darkblueGrd1: "var(--darkblueGrd1)",
        darkblueGrd2: "var(--darkblueGrd2)",
        // primary: "var(--primary)",
        // secondary: "var(--secondary)",
        success: "var(--success)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        info: "var(--info)",
        light: "var(--light)",
        dark: "var(--dark)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        pp: "5rem",
        "4.5xl": "40px",
      },
      screens: {
        "3xl": "1600px",
        "4xl": "1750px",
        "big-laptop": "1380px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
