import { fontFamily } from "tailwindcss/defaultTheme";
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
  	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			boxShadow: {
				'claymorphism': 'inset -12px -8px 16px rgba(0, 0, 0, 0.225), inset 12px 8px 16px rgba(255, 255, 255, 0.1), 24px 24px 48px rgba(0, 0, 0, 0.25)',
				'claymorphism-noshadow': 'inset -12px -8px 16px rgba(0, 0, 0, 0.225), inset 12px 8px 16px rgba(255, 255, 255, 0.1)',
				'claymorphism-2': 'inset -10px -10px 14px rgba(0, 0, 0, 0.3), inset 10px 10px 12px rgba(255, 255, 255, 0.35), 0px 10px 48px rgba(173, 173, 173, 0.15)',
				'neon': '0px 0px 15px var(--tw-shadow)',
				'inner-md' : 'inset 0px 4px 12px var(--tw-shadow)'
			},
			colors: {
				'c-primary': '#5B5F97',
				'c-secondary': '#E8AEB7',
				'c-tertiary': '#CCF5AC',
				'c-background': '#221627',
				'c-darker-background': '#080A0C',
				'c-body-text': '#FAFDF5',

				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans],
        'title': ['sora', 'Arial', 'sans-serif']
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'text-shadow': (value) => ({
					textShadow: value,
					}),
				},
				{ values: theme('textShadow') }
				)
		}),
	],
};

export default config;
