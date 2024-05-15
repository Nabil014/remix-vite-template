import type { Config } from 'tailwindcss'
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', 
  "./node_modules/flowbite/**/*.js",
  "./node_modules/flowbite-react/**/*.js",
  'node_modules/preline/dist/*.js',  

        '.node_modules/preline/dist/*.js'  ,
],
  theme:  {
    extend: {
      
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        aurora: "aurora 60s linear infinite",
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
      }}},
  plugins: [  require("tailwindcss-animate"),   addVariablesForColors, require("daisyui"), require('preline/plugin'),require("flowbite/plugin"),
],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}