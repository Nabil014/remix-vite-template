const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', 
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    'node_modules/preline/dist/*.js',  
    '.node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        custom: 600,
      },
      fontSize: {
        custom: ['16px', { lineHeight: '19.36px' }],
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        custom: `0 4px 6px rgba(0, 0, 0, 0.1)`,
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      colors: {
        customDark: "#0f172a",
        customCard: "#1e293b",
        customText: "#94a3b8",
        customTitle: "#e2e8f0",
        customCircle: "rgba(4, 230, 230, 0.1)",
        customCircleBorder: "rgba(4, 230, 230, 0.5)",
      },
      borderRadius: {
        custom: "15px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, #043033 0%, #000D0E 100%)',
        'custom-radial': 'radial-gradient(50.48% 50.48% at 47.61% 57.74%, rgba(4, 230, 230, 0.5) 0%, rgba(115, 115, 115, 0) 70%)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    require("daisyui"),
    require('preline/plugin'),
    require("flowbite/plugin"),
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
