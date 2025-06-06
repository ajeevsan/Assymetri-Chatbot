// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

export const content = ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"];
export const theme = {
    extend: {
        fontFamily: {
            sans: ["var(--font-inter)", ...fontFamily.sans],
        },
    },
};
export const plugins = [];
