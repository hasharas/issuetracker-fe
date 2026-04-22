/** @type {import('tailwindcss').Config} */
export default {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
            extend: {
                  fontFamily: {
                        display: ["'Syne'", "sans-serif"],
                        body: ["'DM Sans'", "sans-serif"],
                        mono: ["'JetBrains Mono'", "monospace"],
                  },
                  colors: {
                        zinc: {
                              950: "#09090b",
                        },
                  },
                  animation: {
                        "fade-in": "fadeIn 0.3s ease-out",
                        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        "scale-in": "scaleIn 0.2s ease-out",
                  },
                  keyframes: {
                        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
                        slideUp: { from: { opacity: 0, transform: "translateY(16px)" }, to: { opacity: 1, transform: "translateY(0)" } },
                        scaleIn: { from: { opacity: 0, transform: "scale(0.95)" }, to: { opacity: 1, transform: "scale(1)" } },
                  },
            },
      },
      plugins: [],
};